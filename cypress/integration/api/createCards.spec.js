/// <reference types="Cypress" />

import Ajv from "ajv";

describe('Trello API - Create a new Card', () => {
  const ajv = new Ajv();
  const baseUrl = `${Cypress.config('baseUrl')}`;
  const defaultQueryParams = {
    token: Cypress.config('token'),
    key: Cypress.config('apiKey')
  };

  // Create a board
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

  // Create a card using the idList
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
    cy.fixture('schemas/createCardsSchema').as('cardSchema');
  });

  it('Successfully create a new card', function () {
    // Step 1: Create a board
    createBoardRequest('New Board for Card Creation').then((boardResponse) => {
      expect(boardResponse.status).to.eq(200);
      const boardId = boardResponse.body.id;

      // Step 2: Get idList from board
      getListIdRequest(boardId).then((listResponse) => {
        expect(listResponse.status).to.eq(200);
        const idList = listResponse.body[0].id;

        // Step 3: Create the card in list
        createCardRequest('Card created by Robot', idList).then((cardResponse) => {
          expect(cardResponse.status).to.eq(200);
          expect(cardResponse.body).to.have.property('idList', idList);

          // Validate the response contract
          const validate = ajv.compile(this.cardSchema);
          const isValid = validate(cardResponse.body);

          expect(isValid, JSON.stringify(validate.errors)).to.be.true;
        });
      });
    });
  });

  it('Attempt to create a card without a idList', function () {
    createCardRequest(this.cardsData.withoutIdList).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq(this.cardsData.withoutIdList.invalidValueMessage);
    });
  });
});