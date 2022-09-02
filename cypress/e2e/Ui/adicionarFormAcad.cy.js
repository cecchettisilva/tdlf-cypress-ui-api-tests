/// <reference types="cypress" />

const formAcademicaPage = require('../../support/FormacaoAcademica/formacaoAcademica-pages')

let massaUsuario;

describe('Funcionalidade: Adicionar formação acadêmica', () => {
    
    beforeEach(() => {
        cy.visit('login')
        
        cy.fixture('user.json').then((usuario) => {
            massaUsuario = usuario;
        });
       
    });

    it('Deve adicionar uma formação acadêmica com sucesso', () => {
        cy.login(massaUsuario.usuarioPadrao)
        cy.visit("adicionar-formacao")
        formAcademicaPage.addFormAcademica('ADS', 'Via', 'Rio Grande do Sul - RS', '10/01/2020', '10/10/2022', 'Teste Bootcamp')
        cy.contains('Formação Acadêmica Adicionada').should('be.visible')
        cy.get('[data-test="education-delete"]').eq(0).click()
        cy.contains('Formação Acadêmica Removida').should('be.visible')
    });

    it('Deve adicionar uma formação acadêmica com sucesso - marcando data atual', () => {
        cy.login(massaUsuario.usuarioPadrao)
        cy.visit("adicionar-formacao")
        formAcademicaPage.addFormAcademicaAtual('ADS', 'Via', 'Rio Grande do Sul - RS', '10/01/2020', 'Teste Bootcamp')
        cy.contains('Formação Acadêmica Adicionada').should('be.visible')
        cy.get('[data-test="education-delete"]').eq(0).click()
        cy.contains('Formação Acadêmica Removida').should('be.visible')
    });

});