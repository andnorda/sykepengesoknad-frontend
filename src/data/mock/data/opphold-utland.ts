import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { Persona } from '../personas'

import { arbeidstaker100Syk } from './sykmeldinger'

export const oppholdUtland: RSSoknad = {
    id: 'b9d67b0d-b1f8-44a5-bcbd-6010b60b90ce',
    sykmeldingId: null,
    soknadstype: 'OPPHOLD_UTLAND',
    status: 'NY',
    fom: null,
    tom: null,
    opprettetDato: '2020-06-03',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: null,
    sykmeldingUtskrevet: null,
    arbeidsgiver: null,
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: null,
    soknadPerioder: [],
    sporsmal: [
        {
            id: '1',
            tag: 'PERIODEUTLAND',
            sporsmalstekst: 'Når skal du reise?',
            undertekst: null,
            svartype: 'PERIODER',
            min: '2020-03-03',
            max: '2020-12-31',
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        {
            id: '2',
            tag: 'LAND',
            sporsmalstekst: 'Hvilket land skal du reise til?',
            undertekst: null,
            svartype: 'LAND',
            min: null,
            max: '50',
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        {
            id: '3',
            tag: 'ARBEIDSGIVER',
            sporsmalstekst: 'Har du arbeidsgiver?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: true,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '4',
                    tag: 'SYKMELDINGSGRAD',
                    sporsmalstekst: 'Er du 100 % sykmeldt?',
                    undertekst: null,
                    svartype: 'JA_NEI',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
                {
                    id: '5',
                    tag: 'FERIE',
                    sporsmalstekst: 'Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?',
                    undertekst: null,
                    svartype: 'JA_NEI',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        {
            id: '6',
            tag: 'BEKREFT_OPPLYSNINGER_UTLAND_INFO',
            sporsmalstekst: 'Før du reiser ber vi deg bekrefte:',
            undertekst:
                '<ul>\n    <li>Jeg har avklart med legen at reisen ikke vil forlenge sykefraværet</li>\n    <li>Reisen hindrer ikke planlagt behandling eller avtaler med NAV</li>\n</ul>',
            svartype: 'IKKE_RELEVANT',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [
                {
                    id: '7',
                    tag: 'BEKREFT_OPPLYSNINGER_UTLAND',
                    sporsmalstekst: 'Jeg bekrefter de to punktene ovenfor',
                    undertekst: null,
                    svartype: 'CHECKBOX_PANEL',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
    ],
    egenmeldtSykmelding: null,
    opprettetAvInntektsmelding: false,
}

export const bareUtland: Persona = {
    soknader: [oppholdUtland],
    sykmeldinger: [arbeidstaker100Syk],
}
