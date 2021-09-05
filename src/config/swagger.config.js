// a workaround to import json via require() in ES6
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// import the swagger definition
export const swaggerDocument = require("./../../swagger.json");

// add a custom theme to swagger
export const swaggerOptions = {
  customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-feeling-blue.css",
  customCss: ".topbar > .wrapper {visibility:hidden} ",
};