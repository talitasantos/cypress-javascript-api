/// <reference types="Cypress" />

describe('Trello API -  Delete a board', () => {
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

    const deleteBoardRequest = (boardId) => {
        return cy.request({
            method: 'DELETE',
            url: `${baseUrl}${boardId}`,
            qs: defaultQueryParams,
            failOnStatusCode: false
        });
    };

    beforeEach(() => {
        cy.fixture('deleteBoards').as('boardData');
    });

    it('Successfully create a new board and delete it', function () {
        createBoardRequest(this.boardData.validBoard).then((response) => {
            expect(response.status).to.eq(200);

            const boardId = response.body.id;
            cy.wrap(boardId).as('id');

            deleteBoardRequest(boardId).then((deleteResponse) => {
                expect(deleteResponse.status).to.eq(200);
            });
        });
    });

    it('Attempt to delete an invalid board', function () {
        deleteBoardRequest(this.boardData.invalidBoardId.boardId).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq('invalid id');
        });
    });
});
