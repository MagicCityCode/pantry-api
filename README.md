# PantryBoss API

_To be continued..._

## ROUGH-DRAFT OUTLINE
- Create 1 API route and test it w/ Postman
- Things to incorporate in backend:
  * DB
    * npm i pg
    * Setup, tbls, connect w/ node.js
  * Error-handling
    * Morgan for server activity-logging
- Security
  * app.disable('x-powered-by');
  * npm i dotenv
  * Helmet
 (npm i express-validator)
- Compression
  * Gzip (npm i compression)
  * PM2 vs Nodemon for restarting / runtime issues / monitoring (npm i -g pm2 then pm2 start server.js -i max)
  
### Soon:
- _Pino/Winston for logging
- _BlueBird promise library for error-handling
- _Swagger
- _Redis for caching
- _Security - HPP, Synk for vulnerability-checking
- _Input validation
- _Joi
- _Express-validator
- _Protect against cross-site request forgery w/ csurf module
- _Protect against brute force - rate-limiter pkg for brute force (npm i rate-limiter-flexible OR npm i express-rate-limit)
- _Jest for testing

