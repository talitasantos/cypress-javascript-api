/// <reference types="Cypress" />

describe('Trello Boards API Tests', () => {
  it('Successfully create a new board', () => {
    cy.request({
       method: 'POST',
       url: `${Cypress.config('baseUrl')}/boards/`,
       qs: {
         token: `${Cypress.config('token')}`,
         key: `${Cypress.config('apiKey')}`,
         name: 'Board created by Robot 3'
       }
     }).then((response) => {
       expect(response.status).to.eq(200);
     });
   });
  it('Attempt to create a board without a name', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/boards/`,
      failOnStatusCode: false,
      qs: {
        token: `${Cypress.config('token')}`,
        key: `${Cypress.config('apiKey')}`
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'invalid value for name');
      expect(response.body).to.have.property('error', 'ERROR');
    });
  });
  it('Attempt to create a board with an invalid Token', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/boards/`,
      failOnStatusCode: false,
      qs: {
        token: `invalidToken`,
        key: `${Cypress.config('apiKey')}`,
        name: 'Board created by Robot 3'
      }
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('Attempt to create a board with an invalid API Key', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/boards/`,
      failOnStatusCode: false,
      qs: {
        token: `${Cypress.config('token')}`,
        key: `7085f6851a2fab9dc40545959882364d`,
        name: 'Board created by Robot 3'
      }
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.eq('invalid key');
    });
  });
  it('Attempt to create a board with a long name (> 16384)', () => {
    const boardName = 'A'.repeat(16385); // String com 16.385 caracteres "A"

    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/boards/`,
      failOnStatusCode: false,
      qs: {
        token: `${Cypress.config('token')}`,
        key: `${Cypress.config('apiKey')}`,
        name: boardName
      }
    }).then((response) => {
      expect(response.status).to.eq(413);
    });
  });
});