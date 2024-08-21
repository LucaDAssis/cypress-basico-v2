Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function name(params) {
    cy.get('#firstName').type("Luicas")
        cy.get('#lastName').type('Assis')
        cy.get('#email').type('lucas@exemplo.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="Submit"]').click()
})