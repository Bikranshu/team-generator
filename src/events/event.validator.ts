import Joi from 'joi';

export default {

    searchDetail: Joi.object({
        id: Joi.string().pattern(new RegExp('^[a-zA-Z0-9-]*$')).required().messages({
            'any.required': '{{#label}} is required!!',
            'string.pattern.base': 'Invalid Id used',
        }),
    }),
};
