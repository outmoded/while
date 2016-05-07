'use strict';

// Load modules

const Code = require('code');
const While = require('..');
const Joi = require('joi');
const Lab = require('lab');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('Scope', () => {

    describe('has()', () => {

        it('generates a rule for enforcing scope', (done) => {

            const context = {
                auth: {
                    credentials: {
                        scope: ['open']
                    }
                }
            };

            const schema = While.scope.has('open', Joi.string());
            Joi.validate('string', schema, { context }, (err, value) => {

                expect(err).to.not.exist();
                done();
            });
        });

        it('enforces required scope', (done) => {

            const context = {
                auth: {
                    credentials: {
                        scope: ['open']
                    }
                }
            };

            const schema = While.scope.has('close', Joi.string());
            Joi.validate('string', schema, { context }, (err, value) => {

                expect(err).to.exist();
                done();
            });
        });

        it('enforces rule', (done) => {

            const context = {
                auth: {
                    credentials: {
                        scope: ['open']
                    }
                }
            };

            const schema = While.scope.has('open', Joi.number());
            Joi.validate('string', schema, { context }, (err, value) => {

                expect(err).to.exist();
                done();
            });
        });
    });

    describe('excludes()', () => {

        it('generates a rule for enforcing scope', (done) => {

            const context = {
                auth: {
                    credentials: {
                        scope: ['close']
                    }
                }
            };

            const schema = While.scope.excludes('open', Joi.string());
            Joi.validate('string', schema, { context }, (err, value) => {

                expect(err).to.not.exist();
                done();
            });
        });

        it('enforces excluded scope', (done) => {

            const context = {
                auth: {
                    credentials: {
                        scope: ['close']
                    }
                }
            };

            const schema = While.scope.excludes('close', Joi.string());
            Joi.validate('string', schema, { context }, (err, value) => {

                expect(err).to.exist();
                done();
            });
        });

        it('enforces rule', (done) => {

            const context = {
                auth: {
                    credentials: {
                        scope: ['open']
                    }
                }
            };

            const schema = While.scope.excludes('close', Joi.number());
            Joi.validate('string', schema, { context }, (err, value) => {

                expect(err).to.exist();
                done();
            });
        });
    });
});


describe('Entity', () => {

    describe('is()', () => {

        it('generates a rule for enforcing entity (user)', (done) => {

            const context = {
                auth: {
                    credentials: {
                        user: 'steve'
                    }
                }
            };

            const schema = While.entity.is('user', Joi.string());
            Joi.validate('string', schema, { context }, (err, value) => {

                expect(err).to.not.exist();
                done();
            });
        });

        it('generates a rule for enforcing entity (app)', (done) => {

            const context = {
                auth: {
                    credentials: {
                        app: 'test'
                    }
                }
            };

            const schema = While.entity.is('app', Joi.string());
            Joi.validate('string', schema, { context }, (err, value) => {

                expect(err).to.not.exist();
                done();
            });
        });

        it('enforces required entity', (done) => {

            const context = {
                auth: {
                    credentials: {
                        app: 'test'
                    }
                }
            };

            const schema = While.entity.is('user', Joi.string());
            Joi.validate('string', schema, { context }, (err, value) => {

                expect(err).to.exist();
                done();
            });
        });

        it('enforces rule', (done) => {

            const context = {
                auth: {
                    credentials: {
                        user: 'steve'
                    }
                }
            };

            const schema = While.entity.is('user', Joi.number());
            Joi.validate('string', schema, { context }, (err, value) => {

                expect(err).to.exist();
                done();
            });
        });

        it('enforces rule (required)', (done) => {

            const context = {
                auth: {
                    credentials: {
                        user: 'steve'
                    }
                }
            };

            const schema = {
                a: While.entity.is('user', Joi.number().required())
            };

            Joi.validate({ a: 5 }, schema, { context }, (err, value1) => {

                expect(err).to.not.exist();

                Joi.validate({}, schema, { context }, (err, value2) => {

                    expect(err).to.exist();
                    done();
                });
            });
        });
    });
});
