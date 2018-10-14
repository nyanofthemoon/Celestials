// https://github.com/hapijs/joi
// Joi.validate(LOGIN_FORM_DATA, validate.auth.schema.body)
// Joi.validate(JOIN_FORM_DATA, validate.account.schema.body)

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
  market: {
    schema: {
      body: {
        of_amount: Joi.number().integer().required().min(1),
        of_type: Joi.string().required().valid(['gold', 'food', 'wood', 'brick', 'ore', 'glass']),
        for_type: Joi.string().required().valid(['gold', 'food', 'wood', 'brick', 'ore', 'glass'])
      }
  }},





};

module.exports.validate = validate;
