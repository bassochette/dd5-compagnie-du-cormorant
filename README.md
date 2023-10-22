#  NestJS starter with authentication

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Features

- [x] Health check endpoint
- [x] User registration, login, logout
- [x] User email verification
- [x] User password reset
- [x] Mailer using MJML + ejs template
- [x] Swagger

### Used Technologies

- [x] NestJS
- [x] TypeORM
- [x] PostgreSQL
- [x] Passport
- [x] JWT
- [x] MJML
- [x] EJS

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Testing emails

Start maildev server, then open http://localhost:1080/ in your browser.

```bash
npm run maildev
```

Make sure to use the default mailer configuration in development mode.
