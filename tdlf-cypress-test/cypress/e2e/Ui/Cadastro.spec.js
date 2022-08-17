/// <reference types="cypress" />

describe('Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.visit('cadastrar')
    });

    it('Realizar um cadastro novo, criar um perfil e excluir ao final', () => {
        cy.cadastrar()
        cy.criarPerfil()
        cy.adicionarRedesSociais()
        cy.validarCriacaoPerfil()
        cy.adicionarExpProf()
        cy.adicionarFormAcad()
        cy.excluirContaCadastro()
    });
});