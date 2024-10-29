/// <reference types="Cypress" />

describe('Trello Delete Cards API Tests', () => {
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
  
    const deleteCardRequest = (cardId) => {
      return cy.request({
        method: 'DELETE',
        url: `${baseUrl}${cardId}`,
        qs: defaultQueryParams,
        failOnStatusCode: false
      });
    };
  
    it('Successfully create a new card and delete it', () => {
      createCardRequest({ name: 'Card created by Robot', idList: '671f5ae583e19f6ccdc96c90' }).then((response) => {
        expect(response.status).to.eq(200);
  
        // Stores the ID of the card created to delete later
        const cardId = response.body.id;
        cy.wrap(cardId).as('id');
  
        // Delete the created card
        deleteCardRequest(cardId).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(200);
        });
      });
    });
  
    it('Attempt to delete an invalid card', () => {
      const invalidCardId = '67201e3569ca1487b2ff4f40FXXX';
      
      deleteCardRequest(invalidCardId).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.eq('invalid id');;
      });
    });
  });
  