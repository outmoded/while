'use strict';

// Load modules

const Joi = require('joi');


// Declare internals

const internals = {};


exports.scope = {
    has: function (scope, rule, _not) {

        return Joi.when(Joi.ref('$auth.credentials.scope'), {
            is: Joi.array().items(Joi.valid(scope).required(), Joi.string()),
            then: _not ? Joi.forbidden() : rule,
            otherwise: _not ? rule : Joi.forbidden()
        });
    },
    excludes: function (scope, rule) {

        return exports.scope.has(scope, rule, true);
    }
};


exports.entity = {
    is: function (entity, rule) {

        return Joi.when(Joi.ref('$auth.credentials.user'), {
            is: entity === 'user' ? Joi.exist() : Joi.forbidden(),
            then: rule,
            otherwise: Joi.forbidden()
        });
    }
};
