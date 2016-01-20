'use strict';

// Load modules

const Joi = require('joi');


// Declare internals

const internals = {};


exports.scope = {
    has: function (scope, rule) {

        return Joi.when(Joi.ref('$auth.credentials.scope'), {
            is: Joi.array().items(Joi.valid(scope).required(), Joi.string()),
            then: rule,
            otherwise: Joi.forbidden()
        });
    }
};
