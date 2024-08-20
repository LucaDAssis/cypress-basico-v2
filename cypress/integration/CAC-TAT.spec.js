
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    this.beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })
    
    it('preencha os campos obrigátorios e enviar o formulário', function(){
        const textLong = "Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text,"
        cy.get('#firstName').type("Luicas")
        cy.get('#lastName').type('Assis')
        cy.get('#email').type('lucas@exemplo.com')
        cy.get('#open-text-area').type(textLong, {delay : 0})
        cy.get('button[type="Submit"]').click()

        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type("Luicas")
        cy.get('#lastName').type('Assis')
        cy.get('#email').type('lucas@exemplo,com')
        cy.get('#open-text-area').type('test')
        cy.get('button[type="Submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio como preencher com valor não-númerico', function() {
        cy.get('#phone').type('abcdefghaikhkd').should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type("Luicas")
        cy.get('#lastName').type('Assis')
        cy.get('#email').type('lucas@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('test')
        cy.get('button[type="Submit"]').click()

        cy.get('.error').should('be.visible')
        
    });

    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type("Lucas").should('have.value','Lucas').clear().should('have.value', "")
        cy.get('#lastName').type('Assis').should('have.value','Assis').clear().should('have.value', "")
        cy.get('#email').type('lucas@exemplo.com').should('have.value','lucas@exemplo.com').clear().should('have.value', "")
        cy.get('#phone').type('81999223344').should('have.value', '81999223344').clear().should('have.value','')


        
    });

  })


  