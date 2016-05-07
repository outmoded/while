'use strict';

// Load modules

const Boom = require('boom');
const Joi = require('joi');


// Declare internals

const internals = {};


exports.scope = {
    has: function (scope, rule, _not) {

        return Joi.when(Joi.ref('$auth.credentials.scope'), {
            is: Joi.array().items(Joi.valid(scope).required(), Joi.string()),
            then: _not ? Joi.forbidden().error(Boom.forbidden('Insufficient scope')) : rule,
            otherwise: _not ? rule : Joi.forbidden().error(Boom.forbidden('Insufficient scope'))
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
            otherwise: Joi.forbidden().error(Boom.forbidden(entity === 'user' ? 'User credentials required' : 'User credentials not allowed'))
        });
    }
};
