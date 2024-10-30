/// <reference types="Cypress" />

import Ajv from "ajv";

describe('Trello Create Boards API Tests', () => {
    const ajv = new Ajv();
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
        cy.fixture('schemas/createBoardsSchema').as('createBoardsSchema'); // Carregar o esquema do board
    });

    it('Successfully create a new board with valid schema', function () {
        createBoardRequest(this.boardsData.validBoard).then((response) => {
            expect(response.status).to.eq(200);

            // Validate the response contract
            const validate = ajv.compile(this.createBoardsSchema);
            const isValid = validate(response.body);

            expect(isValid, JSON.stringify(validate.errors)).to.be.true;
        });
    });
});