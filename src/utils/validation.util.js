import { body, param } from "express-validator";

// sets validation parameters for inputs receieved from routers

export const stringQueryValidator = [param("query").not().isEmpty().isAlphanumeric("en-US", {ignore: " "}).trim()];

export const movieBodyValidator = [
  body("name").not().isEmpty().isAlphanumeric("en-US", {ignore: " "}).trim(),
  body("description").not().isEmpty().isAlphanumeric("en-US", {ignore: " "}).trim(),
];