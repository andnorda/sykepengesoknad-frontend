import { arbeidstaker } from '../../../src/data/mock/data/soknader-opplaering'

describe('Tester at åpne sykmeldinger må sendes inn', () => {
    describe('Tester med en usendt sykmelding', () => {
        it('Laster søknader ', function () {
            cy.visit(
                'http://localhost:8080/syk/sykepengesoknad?testperson=en-usendt-sykmelding'
            )

            cy.get(
                `#soknader-list-til-behandling article a[href*=${arbeidstaker.id}]`
            ).click()
        })

        it('Viser advarsel om at det finnes sykmelding', function () {
            cy.url().should('include', `${arbeidstaker.id}/1`)

            cy.contains(
                'Du har en sykmelding du må velge om du skal bruke, før du kan begynne på denne søknaden.'
            )

            cy.contains('Gå til sykmeldingen').click()
        })

        it('Vi lander på sykmeldingen', function () {
            cy.url().should(
                'equal',
                'https://sykmeldinger.labs.nais.io/syk/sykmeldinger/APEN'
            )
        })
    })

    describe('Tester med flere usendte sykmeldinger', () => {
        it('Laster søknader ', function () {
            cy.visit(
                'http://localhost:8080/syk/sykepengesoknad?testperson=to-usendte-sykmeldinger'
            )

            cy.get(
                `#soknader-list-til-behandling article a[href*=${arbeidstaker.id}]`
            ).click()
        })

        it('Viser advarsel om at det finnes sykmeldinger', function () {
            cy.url().should('include', `${arbeidstaker.id}/1`)

            cy.contains(
                'Du har to sykmeldinger du må velge om du skal bruke, før du kan begynne på denne søknaden.'
            )

            cy.contains('Gå til sykmeldingen').click()
        })

        it('Vi lander på sykmeldingen', function () {
            cy.url().should(
                'equal',
                'https://sykmeldinger.labs.nais.io/syk/sykmeldinger/APEN'
            )
        })
    })
})
