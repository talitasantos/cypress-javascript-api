/// <reference types="Cypress" />

import Ajv from "ajv";

describe('Trello Cards API Tests', () => {
  const ajv = new Ajv();
  const baseUrl = `${Cypress.config('baseUrl')}/cards/`;
  const defaultQueryParams = {
    token: Cypress.config('token'),
    key: Cypress.config('apiKey')
  };

  const createCardRequest = (queryParams) => {
    return cy.request({
      method: 'POST',
      url: baseUrl,
      qs: { ...defaultQueryParams, ...queryParams },
      failOnStatusCode: false
    });
  };

  beforeEach(() => {
    cy.fixture('createCards').as('cardsData');
    cy.fixture('schemas/createCardsSchema').as('cardSchema'); 
  });

  it('Successfully create a new card with valid schema', function () {
    createCardRequest(this.cardsData.validCard).then((response) => {
      expect(response.status).to.eq(200);

      // Validate the response contract
      const validate = ajv.compile(this.cardSchema);
      const isValid = validate(response.body);

      expect(isValid, JSON.stringify(validate.errors)).to.be.true;
    });
  });
});