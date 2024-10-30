/// <reference types="Cypress" />

describe('Trello Create Boards API Tests', () => {
  const baseUrl = `${Cypress.config('baseUrl')}/boards/`;
  const defaultQueryParams = {
    token: Cypress.config('token'),
    key: Cypress.config('apiKey')
  };

  const createBoardRequest = (queryParams) => {
    return cy.request({
      method: 'POST',
      url: baseUrl,
      qs: { ...defaultQueryParams, ...queryParams },
      failOnStatusCode: false
    });
  };

  beforeEach(() => {
    cy.fixture('createBoards').as('boardsData');
  });

  it('Successfully create a new board', function () {
    createBoardRequest(this.boardsData.validBoard).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Attempt to create a board without a name', function () {
    createBoardRequest(this.boardsData.withoutName).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'invalid value for name');
      expect(response.body).to.have.property('error', 'ERROR');
    });
  });

  it('Attempt to create a board with an invalid Token', function () {
    createBoardRequest(this.boardsData.invalidToken).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('Attempt to create a board with an invalid API Key', function () {
    createBoardRequest(this.boardsData.invalidApiKey).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.eq('invalid key');
    });
  });

  it('Attempt to create a board with a long name (> 16384)', () => {
    const boardName = 'A'.repeat(16385);

    createBoardRequest({ name: boardName }).then((response) => {
      expect(response.status).to.eq(413);
    });
  });

});
