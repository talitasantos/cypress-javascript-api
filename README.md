
# API Testing With Cypress

This project aims to provide test automation artifacts in the integration layer using the Java Script.

## ☑️ You must have:

To execute the project you must have:

- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en/)

## 📁 Directory structure

- *fixtures/* - where you store data that will be used in tests. This data can be in JSON, CSV, or any other easy-to-read data format. They are especially useful for simulating API responses, storing input data, or any other static data you want to load into your tests.

- *integration/* - where the test files themselves are located, organized by functionality or type of test. It is the default directory for test scripts, where you define test specifications, API response checks, and data validations.

## How to run the project 🖥️

Clone the repository:

```bash
  git clone git@github.com:talitasantos/cypress-javascript-api.git
```

Install the dependencies:
```bash
  npm install
```

Generate your `TRELLO_TOKEN` and `TRELLO_API_KEY` you must follow the steps from [Authorizing With Trello's REST API](https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/#allowed-origins).

Create the `.env` file

Before running the tests you need to create the `.env` file in the root of your project with the environment variables necessary for the tests. The two environment variables needed for testing are: `TRELLO_TOKEN` and `TRELLO_API_KEY`.

Run all tests:
```bash
  npm run test
```

Run the tests:
```bash
  npm run test:createBoards
  npm run test:createCards
  npm run test:deleteBoards
  npm run test:deleteCards
```

## Technologies 💻

- [Node.js](https://nodejs.org/en/)
- [Cypress](https://www.cypress.io/)