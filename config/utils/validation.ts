import joi from "joi";

export const envVarsSchema = joi
  .object({
    AUTH_TOKEN: joi.string().required(),

    APP_CURRENT_DB: joi.string().valid("mongodb", "postgres").required(),

    POSTGRES_HOST: joi.string().required(),
    POSTGRES_PORT: joi.number().required(),
    POSTGRES_DATABASE: joi.string().required(),
    POSTGRES_USER: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),

    MONGODB_URL: joi.string().required(),
    MONGODB_DATABASE: joi.string().required(),
  })
  .unknown()
  .required();
