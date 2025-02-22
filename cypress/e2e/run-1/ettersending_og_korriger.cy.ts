import { arbeidstakerGradert } from '../../../src/data/mock/data/opplaering'

describe('Tester ettersending og korrigering', () => {
    const soknad = arbeidstakerGradert

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click()
    })

    it('Svar på søknad', function () {
        cy.url().should('include', `${soknad.id}/1`)
        cy.get('.navds-checkbox__label').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/2`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/3`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/4`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/5`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/6`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/7`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/8`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/9`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/10`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/11`)
        cy.get('.navds-checkbox__label').click({ force: true })
        cy.contains('Send søknaden').click()
    })

    it('Kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)

        // Sendt til
        cy.get('.sendt-info').should('contain', 'POSTEN NORGE AS, BÆRUM (Org.nr. 974654458)').and('contain', 'NAV')

        // Kan ikke ettersende til nav på kvittering
        cy.contains('Jeg vil at søknaden skal behandles av NAV').should('not.exist')
    })

    it('Ettersend', () => {
        cy.get('.brodsmuler__smuler .navds-link:contains(Søknader)').click({
            force: true,
        })
        cy.get(`#soknader-sendt article a[href*=${soknad.id}]`).click({
            force: true,
        })

        cy.contains('Jeg vil at søknaden skal behandles av NAV').click()
        cy.contains(
            'Vanligvis behandles søknaden bare av NAV hvis det samlede sykefraværet er 16 dager eller mer. Denne søknaden er beregnet til å være kortere. Hvis arbeidsgiveren din eller NAV har bedt deg sende den likevel, gjør du det her.',
        )
        cy.contains('Send søknaden til NAV').click()
        cy.contains('Jeg vil at søknaden skal behandles av NAV').should('not.exist')
    })

    it('Korriger', () => {
        // Endre søknaden
        cy.url().should('include', `/sendt/${soknad.id}`)
        cy.contains('Jeg vil endre svarene i søknaden').click()
        cy.contains('Ok').click()

        // Ny søknad
        cy.url().should('not.include', `/kvittering/${soknad.id}`)
        cy.url().should('include', '/1')

        // ANSVARSERKLARING er resatt
        cy.get('.navds-checkbox__input[type=checkbox]').should('not.be.checked')
        cy.get('.navds-checkbox__label').click({ force: true })
        cy.get('.navds-checkbox__input[type=checkbox]').should('be.checked')
        cy.contains('Gå videre').click()

        cy.contains('Gå videre').click()
        cy.contains('Gå videre').click()
        cy.contains('Gå videre').click()
        cy.contains('Gå videre').click()
        cy.contains('Gå videre').click()
        cy.contains('Gå videre').click()
        cy.contains('Ja').click()
        cy.contains('Gå videre').click()
        cy.contains('Gå videre').click()
        cy.contains('Gå videre').click()
        cy.get('.navds-checkbox__label').click({ force: true })
        cy.contains('Send endringene').click()

        cy.url().should('include', `/kvittering/`)
    })

    it('Søknad har teaser', () => {
        cy.get('.brodsmuler__smuler .smule .navds-link:contains(Søknader)').click({ force: true })
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')

        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).should('not.exist')
        cy.get(`#soknader-sendt article a[href*=${soknad.id}]`)
            .should('contain', '1. – 24. april 2020')
            .and('contain', 'Sendt til arbeidsgiver og NAV')
    })
})
