import Joi from 'joi';

export default {

    searchDetail: Joi.object({
        id: Joi.string().pattern(new RegExp('^[a-zA-Z0-9-]*$')).required().messages({
            'any.required': '{{#label}} is required!!',
            'string.pattern.base': 'Invalid Id used',
        }),
    }),

    addOrUpdate: Joi.array()
        .items(
            Joi.object({
                id: Joi.number().allow('', null),
                name: Joi.string().required(),
                skill: Joi.number().required(),
            })
        )
        .required()
        .messages({
            'array.base': 'Players must be an array.',
            'any.required': 'Players are required.',
        }),
};
