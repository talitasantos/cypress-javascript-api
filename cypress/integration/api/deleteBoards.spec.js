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

//       // Stores the ID of the created board
//       cy.wrap(response.body.id).as('boardId');

//       cy.request('DELETE', `${boardId}`).then((response) => {
//         expect(response.status).to.eq(200);
//         expect(response.body).to.have.property('_value', null);
//       });

//     });
//   });

//   // it('should delete the board', () => {
//   //   cy.request('DELETE', `${boardId}`).then((response) => {
//   //     expect(response.status).to.eq(200);
//   //     expect(response.body).to.have.property('_value', null);
//   //   });
//   // });

//   // it('should verify the user is deleted', () => {
//   //   cy.request({ method: 'GET', url: `${boardId}`, failOnStatusCode: false })
//   //     .then((response) => {
//   //       expect(response.status).to.eq(404);
//   //     });
//   // });
// });
