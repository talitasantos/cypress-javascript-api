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

    it('Successfully create a new card', () => {
        createCardRequest({ name: 'Card created by Robot', idList: '671d789c89e6c35196d5d940' }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Attempt to create a card without a idList', () => {
        createCardRequest({}).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq('invalid value for idList');
        });
    });

    it('Attempt to create a card with non-existent idList', () => {
        createCardRequest({ idList: '671d789c89e6c35196d5d948' }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.eq('could not find the board that the card belongs to');
        });
    });

    it('Attempt to create a card with an invalid Token', () => {
        createCardRequest({
            token: 'invalidToken',
            idList: '671d789c89e6c35196d5d940'
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it('Attempt to create a card with an invalid API Key', () => {
        createCardRequest({
            key: '7085f6851a2fab9dc40545959882364d',
            idList: '671d789c89e6c35196d5d940'
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.eq('invalid key');
        });
    });
});
