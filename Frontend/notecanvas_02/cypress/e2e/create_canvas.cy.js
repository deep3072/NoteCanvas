// Spec 2 : Create canvas on Dashboard

describe('Create Canvas Tests', () => {
 
    beforeEach(() => {
        cy.visit('http://localhost:5173')
        cy.get('input[name="loginEmailOrUsername"]').type('jim@gmail.com');
        cy.get('input[name="loginPassword"]').type('check@30');
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/dashboard');
      });

    it('should open the dialog to add a new canvas and create the canvas', () => {
      cy.contains('Add new space').click();
      cy.get('input[name="canvas_name"]').type('My New Canvas');
      cy.contains('button', 'Create').click(); 
  
      cy.contains('My New Canvas').should('be.visible'); // Checks that the new canvas name is visible on the dashboard
    });
  
    it('should cancel creating a new canvas when clicking cancel button', () => {
      cy.contains('Add new space').click(); // Open the dialog
      cy.get('input[name="canvas_name"]').type('My Unused Canvas'); // Type in a name, but will cancel
      cy.contains('button', 'Cancel').click(); // Click the 'Cancel' button in the dialog
  
      cy.contains('My Unused Canvas').should('not.exist'); // Ensures the cancelled canvas name is not on the dashboard
    });
  
  });
  