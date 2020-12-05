# PantryBoss API

1. Clone this repo
2. Run `npm install`
3. Add your own .env file

- `src/config/index.ts`
  - `JWT_SECRET` - jwt secret key
  - `JWT_EXPIRES` - jwt expiration length
- `src/controllers/spoonacular.ts`
  - `REACT_APP_SPOONACULAR_KEY` - API access key for [Spoonacular](https://spoonacular.com/food-api)
- `src/db/index.ts` - postgres credentials
  - `PGUSER`
  - `PGHOST`
  - `PGDATABASE`
  - `PGPASS`
  - `PGPORT`
- `src/server.ts`
  - `PORT` - node.js port

4. Run `npm start`

## ROUGH-DRAFT OUTLINE

- Test API routes & auth Postman
- Things to incorporate in backend:
  - DB
    - PostgreSQL
  - Error-handling
    - Morgan for server activity-logging
- Auth
  - JWT, Passport
  - SSO soon
- Security
  - app.disable('x-powered-by');
  - .env
  - Helmet
    (npm i express-validator)
- Compression
  - Gzip (npm i compression)
  - PM2 vs Nodemon for restarting / runtime issues / monitoring (npm i -g pm2 then pm2 start server.js -i max)

### Soon:

- _Pino/Winston for logging_
- _BlueBird promise library for error-handling_
- _Swagger_
- _Redis for caching_
- _Security - HPP, Synk for vulnerability-checking_
- _Input validation_
- _Joi_
- _Express-validator_
- _Protect against cross-site request forgery w/ csurf module_
- _Protect against brute force - rate-limiter pkg for brute force (npm i rate-limiter-flexible OR npm i express-rate-limit)_
- _Jest for testing_
