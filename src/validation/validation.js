import Joi from "joi";

export const Login = Joi.object({
    user_name: Joi.string().required().max(128),
    password: Joi.string().required().max(128),
    email: Joi.string().required().max(128)
})