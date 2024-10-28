/// <reference types="Cypress" />

describe('Trello Cards API Tests', () => {
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

  it('Successfully create a new card', () => {
    createCardRequest({ name: 'Card created by Robot' , idList: '671d789c89e6c35196d5d940'}).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});