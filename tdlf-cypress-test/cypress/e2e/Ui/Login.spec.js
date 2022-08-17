/// <reference types="cypress" />

let massaUsuario;

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('login')

        cy.fixture('user.json').then((usuario) => {
            massaUsuario = usuario;
        });
    });
    
    it('Deve fazer login com sucesso', () => {
        cy.login(massaUsuario.usuarioPadrao)
    });

    it('Não deve fazer login com sucesso', () => {
        cy.loginComErro(massaUsuario.usuarioSenhaInvalida)
    });
});


/*
    Funcionalidade: Login
    Eu como usuário das Conexão QA
    Quero fazer o login 
    Para editar meu perfil

    Cenário: Login com sucesso
    Arrange - Dado - Pré-requisito -> Dado que eu esteja na tela de login
    Action - Quando - Ação do usuário -> Quando eu inserir usuário e senha
    Assert - Então - Resultado esperado -> Então deve me direcionar para o dashboard

    Cenário: Validar mensagem de erro

    Cenário: Recuperar senha 
*/