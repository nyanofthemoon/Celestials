'use strict';

const Joi = require('joi');

const validate = {
  auth: {
    schema: {
      body: {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5).max(32)
      }
  }},
  account: {
    schema: {
      body: {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5).max(32)
      }
  }},



};

module.exports.validate = validate;
