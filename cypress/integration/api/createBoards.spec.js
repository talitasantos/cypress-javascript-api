// /// <reference types="Cypress" />

// describe('Trello Boards API Tests', () => {
//   const baseUrl = `${Cypress.config('baseUrl')}/boards/`;
//   const defaultQueryParams = {
//     token: Cypress.config('token'),
//     key: Cypress.config('apiKey')
//   };

//   const createBoardRequest = (queryParams) => {
//     return cy.request({
//       method: 'POST',
//       url: baseUrl,
//       qs: { ...defaultQueryParams, ...queryParams },
//       failOnStatusCode: false
//     });
//   };

//   it('Successfully create a new board', () => {
//     createBoardRequest({ name: 'Board created by Robot' }).then((response) => {
//       expect(response.status).to.eq(200);
//     });
//   });

//   it('Attempt to create a board without a name', () => {
//     createBoardRequest({}).then((response) => {
//       expect(response.status).to.eq(400);
//       expect(response.body).to.have.property('message', 'invalid value for name');
//       expect(response.body).to.have.property('error', 'ERROR');
//     });
//   });

//   it('Attempt to create a board with an invalid Token', () => {
//     createBoardRequest({
//       token: 'invalidToken',
//       name: 'Board created by Robot'
//     }).then((response) => {
//       expect(response.status).to.eq(401);
//     });
//   });

//   it('Attempt to create a board with an invalid API Key', () => {
//     createBoardRequest({
//       key: '7085f6851a2fab9dc40545959882364d',
//       name: 'Board created by Robot'
//     }).then((response) => {
//       expect(response.status).to.eq(401);
//       expect(response.body).to.eq('invalid key');
//     });
//   });

//   it('Attempt to create a board with a long name (> 16384)', () => {
//     const boardName = 'A'.repeat(16385);

//     createBoardRequest({ name: boardName }).then((response) => {
//       expect(response.status).to.eq(413);
//     });
//   });
// });
