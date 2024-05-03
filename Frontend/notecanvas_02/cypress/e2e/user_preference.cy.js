// Spec 4 : Update password on User Preference

describe('User Preference Tests', () => {

      it('Allows the user to update their password', () => {
        cy.visit('http://localhost:5173')
        cy.get('input[name="loginEmailOrUsername"]').type('jim@gmail.com');
        cy.get('input[name="loginPassword"]').type('check@30'); 
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/dashboard');

        cy.get('svg[data-testid="TuneOutlinedIcon"]').click();
        cy.url().should('include', '/userPref');
        cy.get('input[name="Current password"]').type('check@30');
        cy.get('input[name="Set new password"]').type('new@30');
        cy.get('input[name="Confirm new password"]').type('new@30');

        cy.get('button').contains('Update Password').click();

        cy.contains('Password updated successfully');
    });

    it('Updates the password back to original one', () => {

        cy.visit('http://localhost:5173')
        cy.get('input[name="loginEmailOrUsername"]').type('jim@gmail.com'); 
        cy.get('input[name="loginPassword"]').type('new@30'); 
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/dashboard');

        cy.get('svg[data-testid="TuneOutlinedIcon"]').click();
        cy.url().should('include', '/userPref');
        cy.get('input[name="Current password"]').type('new@30');
        cy.get('input[name="Set new password"]').type('check@30');
        cy.get('input[name="Confirm new password"]').type('check@30');

        // Submit the form
        cy.get('button').contains('Update Password').click();
        cy.contains('Password updated successfully');
    });

    it('Checks if current password is correct or not', () => {
        
        cy.visit('http://localhost:5173')
        cy.get('input[name="loginEmailOrUsername"]').type('jim@gmail.com');
        cy.get('input[name="loginPassword"]').type('check@30'); 
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/dashboard');

        cy.get('svg[data-testid="TuneOutlinedIcon"]').click();
        cy.url().should('include', '/userPref');
        cy.get('input[name="Current password"]').type('wrong current password');
        cy.get('input[name="Set new password"]').type('new@30');
        cy.get('input[name="Confirm new password"]').type('new@30');

        cy.get('button').contains('Update Password').click();
        cy.contains('Current password is wrong'); 
    });

    it('Checks if new password and confirm new password matches or not', () => {
       
        cy.visit('http://localhost:5173')
        cy.get('input[name="loginEmailOrUsername"]').type('jim@gmail.com');
        cy.get('input[name="loginPassword"]').type('check@30');
        cy.get('button').contains('Login').click();
        cy.url().should('include', '/dashboard');

        cy.get('svg[data-testid="TuneOutlinedIcon"]').click();
        cy.url().should('include', '/userPref');
        cy.get('input[name="Current password"]').type('check@30');
        cy.get('input[name="Set new password"]').type('new password');
        cy.get('input[name="Confirm new password"]').type('mismatching new password');
        cy.get('button').contains('Update Password').click();

        cy.contains('New password and confirm password do not match');
    });

  });
  