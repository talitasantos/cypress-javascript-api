/// <reference types="Cypress" />

describe('Trello Delete Boards API Tests', () => {
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

    it('Successfully create a new board and delete it', () => {
        createBoardRequest({ name: 'Board created by Robot to be deleted' }).then((response) => {
            expect(response.status).to.eq(200);

            // Stores the ID of the board created to delete later
            const boardId = response.body.id;
            cy.wrap(boardId).as('id');

            // Delete the created board
            deleteBoardRequest(boardId).then((deleteResponse) => {
                expect(deleteResponse.status).to.eq(200);
            });
        });
    });

    it('Attempt to delete a invalid board', () => {
        deleteBoardRequest({ boardId: '67201e3569ca1487b2ff4f40FXXX' }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq('invalid id');
        });
    });

    // it('Attempt to delete a non-existing board', () => {
    //     deleteBoardRequest({ boardId: '67201a6a0d25adc27aae7a6c' }).then((response) => {
    //         expect(response.status).to.eq(404);
    //         expect(response.body).to.eq('The requested resource was not found.');
    //     });
    // });

    // it('Attempt to delete a board with an invalid Token', () => {
    //     deleteBoardRequest({ boardId: '67201a6a0d25adc27aae7a6c', token: 'invalidToken' }).then((deleteResponse) => {
    //         expect(deleteResponse.status).to.eq(401);
    //         eexpect(response.body).to.eq('unauthorized permission requested');
    //     });
    // });

    // it('Attempt to delete a board with an invalid API Key', () => {
    //     deleteBoardRequest({ boardId: '67201a6a0d25adc27aae7a6c', key: 'invalidKey' }).then((deleteResponse) => {
    //         expect(deleteResponse.status).to.eq(401);
    //         expect(deleteResponse.body).to.eq('invalid app key');
    //     });
    // });
});
