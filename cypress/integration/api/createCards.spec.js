/// <reference types="Cypress" />

describe('Trello API - Create Card in New Board', () => {
  const baseUrl = `${Cypress.config('baseUrl')}`;
  const defaultQueryParams = {
    token: Cypress.config('token'),
    key: Cypress.config('apiKey')
  };

  // Função para criar um board
  const createBoardRequest = (boardName) => {
    return cy.request({
      method: 'POST',
      url: `${baseUrl}/boards/`,
      qs: { ...defaultQueryParams, name: boardName },
      failOnStatusCode: false
    });
  };

  // Função para obter o idList do board criado
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

  beforeEach(() => {
    cy.fixture('createCards').as('cardsData');
  });

  it('Creates a new board, retrieves idList, and creates a card in that list', () => {
    // Passo 1: Criar o board
    createBoardRequest('New Board for Card Creation').then((boardResponse) => {
      expect(boardResponse.status).to.eq(200);
      const boardId = boardResponse.body.id;

      // Passo 2: Obter o idList do board
      getListIdRequest(boardId).then((listResponse) => {
        expect(listResponse.status).to.eq(200);
        const idList = listResponse.body[0].id;

        // Passo 3: Criar o card no idList
        createCardRequest('Card created by Robot', idList).then((cardResponse) => {
          expect(cardResponse.status).to.eq(200);
          expect(cardResponse.body).to.have.property('idList', idList);
        });
      });
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