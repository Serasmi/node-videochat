import joi from "joi";

export const envVarsSchema = joi
  .object({
    APP_CURRENT_DB: joi.string().valid("mongodb", "postgres").required(),

    MONGODB_URL: joi.string().required(),
    MONGODB_DATABASE: joi.string().required(),
  })
  .unknown()
  .required();
