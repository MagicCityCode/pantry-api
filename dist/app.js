"use strict";
// require('dotenv').config();
// Security
// app.disable('x-powered-by');
// Security -- Helmet
// const helmet = require('helmet');
// app.use(helmet());
// Compression -- Gzip
// const compression = require('compression')
// const express = require('express')
// const app = express()
// app.use(compression())
// Testing -- Mocha & Chai
// const chai = require('chai')
// const expect = chai.expect
// const foo = require('./src/foo')
// describe('foo', function () {
//   it('should be a function', function () {
//     expect(foo).to.be.a('function')
//   })
//   it('should take one parameter', function () {
//     expect(
//       foo.bind(null, { param1: 5, param2: 345, param3: 98 }))
//       .to.not.throw(Error)
//   })
//   it('should throw error if the parameter is missing', function () {
//     expect(foo.bind(null, {})).to.throw(Error)
//   })
//   it('should throw error if the parameter does not have 3 values', function () {
//     expect(foo.bind(null, { param1: 4, param2: 1 })).to.throw(Error)
//   })
//   it('should return the sum of three values', function () {
//     expect(foo({ param1: 1, param2: 2, param3: 3 })).to.equal(6)
//   })
// })
