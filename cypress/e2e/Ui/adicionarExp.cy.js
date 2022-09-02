/// <reference types="cypress" />

const experienciaPage = require('../../support/Experiencia/experiencia-pages')

let massaUsuario;

describe('Funcionalidade: Adicionar experiência', () => {
    
    beforeEach(() => {
        cy.visit('login')
        
        cy.fixture('user.json').then((usuario) => {
            massaUsuario = usuario;
        });
       
    });

    it('Deve adicionar uma experiência com sucesso', () => {
        cy.login(massaUsuario.usuarioPadrao)
        cy.visit("adicionar-experiencia")
        experienciaPage.addExperiencia('QA', 'Via', 'São Paulo - SP', '10/01/2000', '10/10/2020', 'Teste Bootcamp')
        cy.contains('Experiência Adicionada').should('be.visible')
        cy.get('[data-test="experience-delete"]').eq(0).click()
        cy.contains('Experiência Removida').should('be.visible')
    });

    it('Deve adicionar uma experiência com sucesso - marcando data atual', () => {
        cy.login(massaUsuario.usuarioPadrao)
        cy.visit("adicionar-experiencia")
        experienciaPage.addExperienciaAtual('QA', 'Via', 'São Paulo - SP', '10/01/2000', 'Teste Bootcamp')
        cy.contains('Experiência Adicionada').should('be.visible')
        cy.get('[data-test="experience-delete"]').eq(0).click()
        cy.contains('Experiência Removida').should('be.visible')
    });

});