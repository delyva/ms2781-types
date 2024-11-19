import * as Joi from 'joi';

/**
 * Extends Joi's validation functionality with MS 2781:2023 specific rules
 */
declare module 'joi' {
  interface StringSchema {
    alphanumeric(): this;
    alphabetic(): this;
    phoneNumber(): this;
  }
}

/**
 * Add custom extension methods to Joi
 */
export const MS2781Joi = Joi.extend((joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.alphanumeric': '{{#label}} must only contain alphanumeric characters',
    'string.alphabetic': '{{#label}} must only contain alphabetic characters',
    'string.phoneNumber': '{{#label}} must be a valid phone number with country code',
  },
  rules: {
    alphanumeric: {
      validate(value: string, helpers: Joi.CustomHelpers) {
        if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          return helpers.error('string.alphanumeric');
        }
        return value;
      }
    },
    alphabetic: {
      validate(value: string, helpers: Joi.CustomHelpers) {
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return helpers.error('string.alphabetic');
        }
        return value;
      }
    },
    phoneNumber: {
      validate(value: string, helpers: Joi.CustomHelpers) {
        if (!/^\+\d{10,}$/.test(value)) {
          return helpers.error('string.phoneNumber');
        }
        return value;
      }
    }
  }
}));