
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    this.beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })
    
    it.only('preencha os campos obrigátorios e enviar o formulário', function(){
        const textLong = "Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text,"
        cy.get('#firstName').type("Luicas")
        cy.get('#lastName').type('Assis')
        cy.get('#email').type('lucas@exemplo.com')
        cy.get('#open-text-area').type(textLong, {delay : 0})
        cy.get('button[type="Submit"]').click()

        cy.get('.success').should('be.visible')

    })
  })


  