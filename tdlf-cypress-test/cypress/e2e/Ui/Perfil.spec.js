/// <reference types="cypress" />

let massaUsuario;

describe('Funcionalidade: Perfil', () => {

    beforeEach(() => {
        cy.visit('login')

        cy.fixture('user.json').then((usuario) => {
            massaUsuario = usuario;
        });
    });

    it('Editar empresa de um perfil', () => {
        cy.login(massaUsuario.usuarioPadrao)
        cy.editarPerfil();
    });

    it('Realizar a criação de perfil sem preencher campos obrigatórios', () => {
        cy.cadastrar()
        cy.criarPerfilSemCamposObrigatorios()
    });
});