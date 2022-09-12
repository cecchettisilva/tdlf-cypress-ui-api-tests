/// <reference types="cypress" />

describe('Testes de criação de postagens', () => {

    let token 

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });
    
    it('[POST] - Criar uma postagem', () => {
        cy.request({
            method: 'POST',
            url: '/api/posts',
            headers: {
                Cookies: token
            },
            body: {
                text: 'Postagem teste'
            } 
            }).then((response) => {
                expect(response.status).to.eq(201)
        })
    })
});

describe('Testes de consulta', () => {
    
    let token 

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it('[GET] - Consultar uma postagem', () => {
        cy.request({
            method: 'GET',
            url: '/api/posts',
            headers: {
                Cookies: token
            }
            }).then((response) => {
                expect(response.status).to.eq(200)
        })
    })

    it('[GET] - Consultar uma postagem por ID', () => {

        cy.criarPostagem(token, 'Teste Bootcamp 06-09-2022').then((response) => {
            let id = response.body._id

            cy.request({
                method: 'GET',
                url: `/api/posts/${id}`,
                headers: {
                    Cookies: token
                }
                }).then((response) => {
                    expect(response.status).to.eq(200)
            })
        })
    })
});

describe('Testes de exclusão', () => {

    let token 

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });
    
    it('[DELETE] - Excluir uma postagem', () => {
        cy.criarPostagem(token, 'Teste Bootcamp 06-09-2022').then((response) => {
            let id = response.body._id

            cy.request({
                method: 'DELETE',
                url: `/api/posts/${id}`,
                headers: {
                    Cookies: token
                }
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.msg).to.eq('Post removido')
            })
        })
    });
});

describe('Testes de alteração', () => {

    let token 

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });
    
    it('[PUT] - Curtir uma postagem', () => {
        cy.criarPostagem(token, 'Teste Bootcamp 06-09-2022').then((response) => {
            let id = response.body._id

            cy.request({
                method: 'PUT',
                url: `/api/posts/like/${id}`,
                headers: {
                    Cookies: token
                }
                }).then((response) => {
                    expect(response.status).to.eq(200)
            })
        })
    });
});