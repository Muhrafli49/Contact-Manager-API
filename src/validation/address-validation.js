import Joi from "joi";

const createAddressValidation = Joi.object({
    street: Joi.string().max(200).optional(),
    city: Joi.string().max(100).optional(),
    province: Joi.string().max(100).optional(),
    country: Joi.string().max(100).required(),
    postalCode: Joi.string().max(20).required()
});


const getAddressValidation = Joi.number().min(1).positive().required();


const updateAddressValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    street: Joi.string().max(200).optional(),
    city: Joi.string().max(100).optional(),
    province: Joi.string().max(100).optional(),
    country: Joi.string().max(100).required(),
    postalCode: Joi.string().max(20).required()
});

export {
    createAddressValidation,
    getAddressValidation,
    updateAddressValidation
}