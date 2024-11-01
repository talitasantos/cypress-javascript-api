const { defineConfig } = require("Cypress");
require('dotenv').config(); // load variables from .env

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // set environment variables in Cypress
      config.env.TRELLO_TOKEN = process.env.TRELLO_TOKEN;
      config.env.TRELLO_API_KEY = process.env.TRELLO_API_KEY;
      return config;
    },
    baseUrl: "https://api.trello.com/1", // URL base for tests
    specPattern: "cypress/integration/api/*.spec.js",  // default for finding tests
    supportFile: false,  // disables the support file as it is not needed for API testing
  },
  viewportWidth: 100,  // minimal viewport settings as there is no graphical interface
  viewportHeight: 100,
  video: false,  // disable videos as they are not needed for API testing
  screenshotOnRunFailure: false,  // disable screenshots for API testing
});