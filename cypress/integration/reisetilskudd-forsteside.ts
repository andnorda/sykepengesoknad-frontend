import { nyttReisetilskudd } from '../../src/data/mock/data/reisetilskudd'

describe('Teste førsteside i reisetilskuddsøknaden', () => {


    before(() => {
        cy.visit('http://localhost:8080')
    })

    describe('Landingside og listevisning', () => {
        it('Laster startside', () => {
            cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader')
        })

        it('Søknad har forventa tekst', () => {
            cy.get(`article[aria-labelledby*=${nyttReisetilskudd.id}]`)
                .should('include.text', 'Søknad om reisetilskudd')

        })

        it('Ved klikk så åpnes søknaden om reisetilskudd', () => {
            cy.get(`article[aria-labelledby*=${nyttReisetilskudd.id}]`).click()
            cy.url().should('equal', `http://localhost:8080/soknader/${nyttReisetilskudd.id}/1`)
        })

    })

    describe('Reisetilskudd førsteside', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknader/${nyttReisetilskudd.id}/1`)
        })

        it('Skal ha egen folketrygloven tekst', () => {
            cy.get('.nav-veilederpanel').contains('Ifølge folketrygdloven kan du få reisetilskudd hvis du har rett til sykepenger. Reisetilskuddet kommer da i stedet for sykepengene.')
        })

        it('Laster inn hvem kan få reisetilskudd', () => {
            cy.get('.om-reisetilskudd').should('be.visible')
            cy.get('.om-reisetilskudd .ekspanderbartPanel__tittel')
                .should('be.visible')
                .and('have.text', 'Om reisetilskudd')
                .click()
                .click()

            cy.get('.typo-element').contains('Hva dekker reisetilskuddet')
            cy.get('.typo-normal').contains('Reisetilskuddet dekker nødvendige ekstra reiseutgifter til og fra jobben mens du er syk, altså reiseutgifter utover det du har til vanlig.')

            cy.get('.typo-element').contains('De første 16 dagene')
            cy.get('.typo-element').contains('Legg ved kvitteringer')
            cy.get('.typo-normal').contains('Du må legge ved bilde av kvitteringene dine når du søker NAV om å dekke utgiftene. Fyller du ut fra telefonen, kan du ta bilde av kvitteringene og bruke dem direkte i søknaden.')
        })


    })
})
