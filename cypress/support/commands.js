// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />

import auth from '../fixtures/auth.json'

const faker = require('faker-br')
const inputEmail = '[data-test="login-email"]'
const inputSenha = '[data-test="login-password"]'
const btnLogin = '[data-test="login-submit"]'
const txtBoasVindas = '[data-test="dashboard-welcome"]'
const inputNomeCadastro = '[data-test="register-name"]'
const inputEmailCadastro = '[data-test="register-email"]'
const inputSenhaCadastro = '[data-test="register-password"]'
const inputConfSenhaCadastro = '[data-test="register-password2"]'
const btnCadastrar = '[data-test="register-submit"]'
const btnCriarPerfil = '[data-test="dashboard-createProfile"]'
const tituloPaginas = '.large'
const labelStatus = '#mui-component-select-status'
const listaStatus = '.MuiMenu-list li'
const inputEmpresa = '[data-test="profile-company"]'
const inputSite = '[data-test="profile-webSite"]'
const inputLocalizacao = '[data-test="profile-location"]'
const inputConhecimentos = '[data-test="profile-skills"]'
const inputGithub = '[data-test="profile-gitHub"]'
const inputTexto = '[rows="1"]'
const btnExcluirConta = '[data-test="dashboard-deleteProfile"]'
const modalAlerta = '[data-test="alert"]'
const btnAdicionarRedesSociais = '[data-test="profile-socials"]'
const inputTwitter = '[data-test="profile-twitter"]'
const inputFacebook = '[data-test="profile-facebook"]'
const inputYoutube = '[data-test="profile-youtube"]'
const inputLinkedin = '[data-test="profile-linkedin"]'
const inputInstagram = '[data-test="profile-instagram"]'
const inputMedium = '[data-test="profile-medium"]'
const inputPosicaoExp = '[data-test="experience-title"]'
const inputEmpresaExp = '[data-test="experience-company"]'
const inputLocalizacaoExp = '[data-test="experience-location"]'
const dataInicio = '#from'
const dataFim = '#to'
const btnAddExp = '[data-test="experience-submit"]'
const inputEscola = '[data-test="education-school"]'
const inputGrau = '[data-test="education-degree"]'
const inputCurso = '[data-test="education-fieldOfStudy"]'
const btnaddFormacao = '[data-test="education-submit"]'
const btnConfirmaCriacaoPerfil = '[data-test="profile-submit"]'
const textoStatus = '#status'
const msgCampoObg = '.MuiFormHelperText-root'
const btnEditarPerfil = '[data-test="dashboard-editProfile"]'

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, { timeout: 30000 })
    cy.wait('@loadpage')
})

Cypress.Commands.add('login', (objUsuario) => {
    cy.get(tituloPaginas).should('have.text', 'Login')
    cy.get(inputEmail).type(objUsuario.email)
    cy.get(inputSenha).type(objUsuario.senha)
    cy.get(btnLogin).click()
    cy.get(txtBoasVindas).should('contain', 'Bem-vindo')
})

Cypress.Commands.add('loginComErro', (objUsuario) => {
    cy.get(tituloPaginas).should('have.text', 'Login')
    cy.get(inputEmail).type(objUsuario.email)
    cy.get(inputSenha).type(objUsuario.senha)
    cy.get(btnLogin).click()
    cy.get(modalAlerta).should('have.text', 'Credenciais inválidas')
})

Cypress.Commands.add('cadastrar', () => {

    var gerarSenha = faker.internet.password() //gera a mesma senha para os dois campos de senha

    cy.visit('cadastrar')
    cy.get(inputNomeCadastro).type(faker.name.findName())
    cy.get(inputEmailCadastro).type(faker.internet.email())
    cy.get(inputSenhaCadastro).type(gerarSenha)
    cy.get(inputConfSenhaCadastro).type(gerarSenha)
    cy.get(btnCadastrar).click()
    cy.get(txtBoasVindas).should('contain', 'Bem-vindo')
})

Cypress.Commands.add('criarPerfil', () => {
    cy.get(btnCriarPerfil).click()
    cy.get(tituloPaginas).should('have.text', ' Crie Seu Perfil')
    cy.get(labelStatus).click()

    //seleciona ramdomicamente a seleção de status
    cy.get(listaStatus)
    .then(($li) => {
        const items = $li.toArray()
        return Cypress._.sample(items)
    }).click()

    cy.get(inputEmpresa).type(faker.company.bs())
    cy.get(inputSite).type(faker.internet.url())
    cy.get(inputLocalizacao).type(faker.address.city() + ', ' + faker.address.state())
    cy.get(inputConhecimentos).type('JS, Cypress, Teste Manual')
    cy.get(inputGithub).type('https://github.com/testebootcamp')
    cy.get(inputTexto).type(faker.lorem.text())
})

Cypress.Commands.add('excluirContaCadastro', () => {
    cy.get(btnExcluirConta).click()
    cy.get(modalAlerta, {timeout: 10000}).should('have.text', 'Sua conta foi removida')
    cy.url('login')
})

Cypress.Commands.add('adicionarRedesSociais', () => {
    cy.get(btnAdicionarRedesSociais).should('have.text', 'Adicionar Redes Sociais').click()
    cy.get(inputTwitter).clear().click().type(faker.internet.url())
    cy.get(inputFacebook).clear().click().type(faker.internet.url())
    cy.get(inputYoutube).clear().click().type(faker.internet.url())
    cy.get(inputLinkedin).clear().click().type(faker.internet.url())
    cy.get(inputInstagram).clear().click().type(faker.internet.url())
    cy.get(inputMedium).clear().click().type(faker.internet.url())
})

Cypress.Commands.add('adicionarExpProf', () => {
    cy.visit('adicionar-experiencia') //caso seja necessário usar em outro cenário
    cy.get(tituloPaginas).should('have.text', ' Adicionar Experiência Profissional')
    cy.get(inputPosicaoExp).type(faker.name.jobTitle())
    cy.get(inputEmpresaExp).type(faker.company.bs())
    cy.get(inputLocalizacaoExp).type(faker.address.city())
    cy.get(dataInicio).type('01/01/2021')
    cy.get(dataFim).type('01/01/2022')
    cy.get(inputTexto).type(faker.lorem.text())
    cy.get(btnAddExp).click()
    cy.get(modalAlerta).should('have.text', 'Experiência Adicionada')
})

Cypress.Commands.add('adicionarFormAcad', () => {
    cy.visit('adicionar-formacao') //caso seja necessário usar em outro cenário
    cy.get(tituloPaginas).should('have.text', ' Adicionar Formação Acadêmica')
    cy.get(inputEscola).type(faker.lorem.word())
    cy.get(inputGrau).type(faker.lorem.word())
    cy.get(inputCurso).type(faker.lorem.word())
    cy.get(dataInicio).type('01/01/2021')
    cy.get(dataFim).type('01/01/2022')
    cy.get(inputTexto).type(faker.lorem.text())
    cy.get(btnaddFormacao).click()
    cy.get(modalAlerta).should('have.text', 'Formação Acadêmica Adicionada')
})

Cypress.Commands.add('validarCriacaoPerfil', () => {
    cy.get(btnConfirmaCriacaoPerfil).should('have.value', 'Criar Perfil').click()
    cy.get(modalAlerta, {timeout: 10000}).should('have.text', 'Perfil Criado')
})

Cypress.Commands.add('criarPerfilSemCamposObrigatorios', () => {
    cy.visit('criar-perfil')
    cy.get(tituloPaginas).should('have.text', ' Crie Seu Perfil')
    cy.get(inputEmpresa).type(faker.company.bs())
    cy.get(inputSite).type(faker.internet.url())
    cy.get(inputLocalizacao).type(faker.address.city() + ', ' + faker.address.state())
    cy.get(inputGithub).type('https://github.com/testebootcamp')
    cy.get(inputTexto).type(faker.lorem.text())
    cy.get(btnConfirmaCriacaoPerfil).click()
    cy.get(textoStatus).should('have.css', 'color', 'rgb(244, 67, 54)')
    cy.get(msgCampoObg).should('have.text', 'Conhecimentos é obrigatório')
})

Cypress.Commands.add('editarPerfil', () => {
    cy.get(btnEditarPerfil).click()
    cy.get(inputEmpresa)
    .click()
    .clear()
    .type(faker.company.bs())
    cy.get(btnConfirmaCriacaoPerfil).click()
    cy.get(modalAlerta).should('have.text', 'Perfil Atualizado')
})

Cypress.Commands.add('tokenJwt', () => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: auth
    }).then((response) => {
        return response.body.jwt
    })
})

Cypress.Commands.add('criarPostagem', (token, texto) => {
    cy.request({
        method: 'POST',
        url: '/api/posts',
        headers: {
            Cookies: token
        },
        body: {
            text: texto
        }
    })
})
