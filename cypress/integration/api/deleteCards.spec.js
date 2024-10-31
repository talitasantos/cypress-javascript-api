/// <reference types="Cypress" />

describe('Trello API - Create and Delete Card in New Board', () => {
  const baseUrl = `${Cypress.config('baseUrl')}`;
  const defaultQueryParams = {
    token: Cypress.config('token'),
    key: Cypress.config('apiKey')
  };

  // Create a boad
  const createBoardRequest = (boardName) => {
    return cy.request({
      method: 'POST',
      url: `${baseUrl}/boards/`,
      qs: { ...defaultQueryParams, name: boardName },
      failOnStatusCode: false
    });
  };

  // Get the idList from created board
  const getListIdRequest = (boardId) => {
    return cy.request({
      method: 'GET',
      url: `${baseUrl}/boards/${boardId}/lists`,
      qs: defaultQueryParams,
      failOnStatusCode: false
    });
  };

  // Função para criar um card usando o idList
  const createCardRequest = (cardName, idList) => {
    return cy.request({
      method: 'POST',
      url: `${baseUrl}/cards/`,
      qs: { ...defaultQueryParams, name: cardName, idList },
      failOnStatusCode: false
    });
  };

  // Delete a card usin cardId
  const deleteCardRequest = (cardId) => {
    return cy.request({
      method: 'DELETE',
      url: `${baseUrl}/cards/${cardId}`,
      qs: defaultQueryParams,
      failOnStatusCode: false
    });
  };

  beforeEach(function () {
    cy.fixture('createCards').as('cardsData');
  });

  it('Creates a new board, retrieves idList, creates a card, and deletes the card', function () {
    // Step 1: Create a board
    createBoardRequest('New Board for Card Creation').then((boardResponse) => {
      expect(boardResponse.status).to.eq(200);
      const boardId = boardResponse.body.id;

      // Step 2: Get a idList from board
      getListIdRequest(boardId).then((listResponse) => {
        expect(listResponse.status).to.eq(200);
        const idList = listResponse.body[0].id;

        // Step 3: Create a card card in idList
        createCardRequest('Card created by Robot', idList).then((cardResponse) => {
          expect(cardResponse.status).to.eq(200);
          expect(cardResponse.body).to.have.property('idList', idList);

          const cardId = cardResponse.body.id;

          // Step 4: Delete the card created
          deleteCardRequest(cardId).then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(200);
          });
        });
      });
    });
  });

  it('Attempt to delete an invalid card', function () {
    deleteCardRequest('invalidId').then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq('invalid id');
    });
  });
});


