import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CodeService } from '../../../src/auth/code/code.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthCode } from '../../../src/auth/code/auth-code.entity';
import { UserService } from '../../../src/user/user.service';
import { pgMemDatasource } from '../../helpers/pg-mem-datasource';
import { NoUserNoAuthCodeException } from '../../../src/auth/code/exception/no-user-no-auth-code.exception';
import { CodeType } from '../../../src/auth/code/code-type.enum';

describe('code service', () => {
  let authCodeService: CodeService;
  let testingModule: TestingModule;

  const userServiceMock = {
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([AuthCode])],
      providers: [
        CodeService,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    })
      .overrideProvider(DataSource)
      .useValue(pgMemDatasource())
      .compile();

    authCodeService = testingModule.get<CodeService>(CodeService);
  });

  afterEach(async () => {
    jest.resetAllMocks();
    await testingModule.close();
  });

  it('service defined', () => {
    expect(authCodeService).toBeDefined();
  });

  describe('password reset ', () => {
    it('throw an error if no user match the email', async () => {
      userServiceMock.findByEmail.mockResolvedValueOnce(null);
      await expect(() =>
        authCodeService.generateResetPasswordCode('asasd@lol.nope'),
      ).rejects.toThrow(NoUserNoAuthCodeException);
    });

    it('return a reset password auth code', async () => {
      userServiceMock.findByEmail.mockResolvedValueOnce({
        _id: '507f191e810c19729de860ea',
        email: 'coco@lasticot123.com',
        passwordHash: '1234',
        username: 'coco',
      });

      const code = await authCodeService.generateResetPasswordCode(
        'coco@lasricot123.com',
      );

      expect(code.codeType).toBe(CodeType.RESET_PASSWORD);
      expect(code.code).toBeDefined();
    });
  });
});
