// Spec 1: Login

describe('Login Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
    });


    it('displays the login page correctly', () => {
        cy.contains('Log into your canvas');
        cy.get('input[name="loginEmailOrUsername"]').should('be.visible');
        cy.get('input[name="loginPassword"]').should('be.visible');
        cy.get('button').contains('Login').should('be.visible');
    });

    it('allows the user to log in successfully', () => {
        cy.get('input[name="loginEmailOrUsername"]').type('jim@gmail.com');
        cy.get('input[name="loginPassword"]').type('check@30');
        cy.get('button').contains('Login').click();

        cy.url().should('include', '/dashboard'); 
        
    });
    it('shows an error message on failed login', () => {
        cy.get('input[name="loginEmailOrUsername"]').type('jim@gmail');
        cy.get('input[name="loginPassword"]').type('wrong password'); 
        cy.get('button').contains('Login').click();

        cy.contains('Try again.');
    });

    
});
