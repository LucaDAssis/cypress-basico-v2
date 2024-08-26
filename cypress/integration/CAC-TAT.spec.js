
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    this.beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })
    
    it('preencha os campos obrigátorios e Enviar o formulário', function(){
        const textLong = "Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text, Text,"
        cy.get('#firstName').type("Luicas")
        cy.get('#lastName').type('Assis')
        cy.get('#email').type('lucas@exemplo.com')
        cy.get('#open-text-area').type(textLong, {delay : 0})
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type("Luicas")
        cy.get('#lastName').type('Assis')
        cy.get('#email').type('lucas@exemplo,com')
        cy.get('#open-text-area').type('test')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio como preencher com valor não-númerico', function() {
        cy.get('#phone').type('abcdefghaikhkd').should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type("Luicas")
        cy.get('#lastName').type('Assis')
        cy.get('#email').type('lucas@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('test')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
        
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type("Lucas").should('have.value','Lucas').clear().should('have.value', "")
        cy.get('#lastName').type('Assis').should('have.value','Assis').clear().should('have.value', "")
        cy.get('#email').type('lucas@exemplo.com').should('have.value','lucas@exemplo.com').clear().should('have.value', "")
        cy.get('#phone').type('81999223344').should('have.value', '81999223344').clear().should('have.value','')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    });

    //campos de soluções suspensas
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get(':nth-child(4) > input').check().should('have.value','feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type=radio]').should('have.length', 3).each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    });
    

    //marcando checkBox
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"').check().should('be.checked')
        .last().uncheck().should('not.be.checked')
        
    });



    //should pode receber uma funçao no callback
    it('Selecione um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function name($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    //aqui como se estivesse jogando o arquivo arrastando
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function name($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });


    //pegando arquivo
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture("example").as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile')
    });

    //verificando abrindo link em outra guia
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    //acessando a pagina removendo o tanget e clicando no link assim podendo usar ele no cypress
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
    });

  })


  