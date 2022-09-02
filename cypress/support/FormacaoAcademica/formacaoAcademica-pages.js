class FormAcademicaPage {
    
    get #escola() {return cy.get('[data-test="education-school"]')}
    get #grau() {return cy.get('[data-test="education-degree"]')}
    get #curso() {return cy.get('[data-test="education-fieldOfStudy"]')}
    get #dataInicio() {return cy.get('#from')}
    get #dataFim() {return cy.get('#to')}
    get #descricao() {return cy.get('[rows="1"]')}
    get #checkCursando() {return cy.get('.jss5')}
    get #addForm() {return cy.get('[data-test="education-submit"]')}

    addFormAcademica(escola, grau, curso, dataInicio, dataFim, descricao){
        this.#escola.type(escola)
        this.#grau.type(grau)
        this.#curso.type(curso)
        this.#dataInicio.type(dataInicio)
        this.#dataFim.type(dataFim)
        this.#descricao.type(descricao)
        this.#addForm.click()    
    }

    addFormAcademicaAtual(escola, grau, curso, dataInicio, descricao){
        this.#escola.type(escola)
        this.#grau.type(grau)
        this.#curso.type(curso)
        this.#dataInicio.type(dataInicio)
        this.#checkCursando.check()
        this.#descricao.type(descricao)
        this.#addForm.click()    
    }

}

module.exports = new FormAcademicaPage()