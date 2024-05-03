// Spec 3 : Logout

describe('Logout Test', () => {
    
    beforeEach(() => {
        cy.visit('http://localhost:5173')
        cy.get('input[name="loginEmailOrUsername"]').type('jim@gmail.com'); 
        cy.get('input[name="loginPassword"]').type('check@30'); 
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/dashboard');
      });

      it('Should log out successfully', () => {
        cy.contains('p', 'Logout').click();

        cy.url().should('include', 'http://localhost:5173');
    });
  
  });
  