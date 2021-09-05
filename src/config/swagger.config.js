import { createRequire } from "module";
const require = createRequire(import.meta.url);

export const swaggerDocument = require("./../../swagger.json");

export const swaggerOptions = {
  customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-feeling-blue.css",
  customCss: ".topbar > .wrapper {visibility:hidden} ",
};