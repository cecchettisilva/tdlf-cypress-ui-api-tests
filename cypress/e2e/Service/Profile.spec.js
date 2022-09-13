/// <reference types="cypress" />

describe('Testes CRUD do endpoint de perfil', () => {

    let token 

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });
    
    it('[POST] - Realizar um cadastro novo, criar um perfil e excluir ao final', () => {
        cy.cadastrarAPI()
        cy.criarPerfilAPI()
        cy.excluirContaCadastroAPI() //DELETE 
    })

    it('[POST] - Atualizar um perfil existente', () => {
        cy.editarPerfilAPI(token)
    })

    it('[GET] - Pesquisar/selecionar perfil existente', () => {
        cy.pesquisarPerfilAPI(token)
    })

    it('[PUT] - Adicionar formação acadêmica de usuário existente', () => {
        cy.adicionarFormAcadAPI()
    })
});

