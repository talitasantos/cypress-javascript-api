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
  
    beforeEach(() => {
      cy.fixture('createCards').as('cardsData');
    });
  
    it('Successfully create a new card', function () {
      createCardRequest(this.cardsData.validCard).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  
    it('Attempt to create a card without a idList', function () {
      createCardRequest(this.cardsData.withoutIdList).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.eq('invalid value for idList');
      });
    });
  
    it('Attempt to create a card with non-existent idList', function () {
      createCardRequest(this.cardsData.nonExistentIdList).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.eq('could not find the board that the card belongs to');
      });
    });
  
    it('Attempt to create a card with an invalid Token', function () {
      createCardRequest(this.cardsData.invalidToken).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  
    it('Attempt to create a card with an invalid API Key', function () {
      createCardRequest(this.cardsData.invalidApiKey).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.eq('invalid key');
      });
    });
  });
  