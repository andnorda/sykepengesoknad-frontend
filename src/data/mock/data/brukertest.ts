import dayjs from 'dayjs'

import { RSSoknad } from '../../../types/rs-types/rs-soknad'
import { Sykmelding } from '../../../types/sykmelding'
import { Persona } from '../personas'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'

function hentUrl() {
    if (typeof window === 'undefined') {
        return new URL('http://test')
    }
    return new URL(window.location.href)
}

const url = hentUrl()

const hovedjobb = url.searchParams.get('hovedjobb') ?? 'MATBUTIKKEN AS'
const fom = url.searchParams.get('fom') ?? '2022-09-08'
const tom = url.searchParams.get('tom') ?? '2022-09-21'

const periodeTekst = tilLesbarPeriodeMedArstall(dayjs(fom), dayjs(tom))
const fravaerFoerTekst = tilLesbarPeriodeMedArstall(dayjs(fom).subtract(16, 'days'), dayjs(fom).subtract(1, 'day'))
export const brukertestSykmelding = new Sykmelding({
    id: 'abc5acf2-a44f-42e5-87b2-02c9d0b39ce8',
    pasient: {
        fnr: '08089404496',
        fornavn: 'TYKKMAGET',
        mellomnavn: null,
        etternavn: 'BOLLE',
    },
    mottattTidspunkt: '2022-09-07T22:00:00Z',
    behandlingsutfall: { status: 'MANUAL_PROCESSING', ruleHits: [] },
    legekontorOrgnummer: '223456789',
    arbeidsgiver: { navn: hovedjobb, stillingsprosent: 100 },
    sykmeldingsperioder: [
        {
            fom: fom,
            tom: tom,
            gradert: null,
            behandlingsdager: null,
            innspillTilArbeidsgiver: null,
            type: 'AKTIVITET_IKKE_MULIG',
            aktivitetIkkeMulig: {
                medisinskArsak: {
                    beskrivelse: 'andre årsaker til sykefravær',
                    arsak: ['AKTIVITET_FORHINDRER_BEDRING'],
                },
                arbeidsrelatertArsak: {
                    beskrivelse: 'andre årsaker til sykefravær',
                    arsak: ['ANNET'],
                },
            },
            reisetilskudd: false,
        },
    ],
    sykmeldingStatus: {
        statusEvent: 'SENDT',
        timestamp: '2022-11-17T15:45:33.551189Z',
        arbeidsgiver: {
            orgnummer: '967170232',
            juridiskOrgnummer: '928497704',
            orgNavn: `${hovedjobb}`,
        },
        sporsmalOgSvarListe: [
            {
                tekst: 'Jeg er sykmeldt som',
                shortName: 'ARBEIDSSITUASJON',
                svar: { svarType: 'ARBEIDSSITUASJON', svar: 'ARBEIDSTAKER' },
            },
        ],
    },
    medisinskVurdering: {
        hovedDiagnose: {
            kode: 'L87',
            system: 'ICPC-2',
            tekst: 'TENDINITT INA',
        },
        biDiagnoser: [{ kode: 'L87', system: 'ICPC-2', tekst: 'GANGLION SENE' }],
        annenFraversArsak: null,
        svangerskap: false,
        yrkesskade: false,
        yrkesskadeDato: fom,
    },
    skjermesForPasient: false,
    prognose: {
        arbeidsforEtterPeriode: true,
        hensynArbeidsplassen: 'Må ta det pent',
        erIArbeid: {
            egetArbeidPaSikt: true,
            annetArbeidPaSikt: true,
            arbeidFOM: fom,
            vurderingsdato: fom,
        },
        erIkkeIArbeid: null,
    },
    tiltakArbeidsplassen: 'Fortsett som sist.',
    tiltakNAV:
        'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ',
    andreTiltak: null,
    meldingTilNAV: null,
    meldingTilArbeidsgiver: null,
    kontaktMedPasient: { kontaktDato: null, begrunnelseIkkeKontakt: null },
    behandletTidspunkt: '2022-09-08T00:00:00Z',
    behandler: {
        fornavn: 'Frida',
        mellomnavn: 'Perma',
        etternavn: 'Frost',
        adresse: {
            gate: 'Kirkegårdsveien 3',
            postnummer: 1348,
            kommune: 'Rykkinn',
            postboks: null,
            land: 'Country',
        },
        tlf: 'tel:94431152',
    },
    syketilfelleStartDato: fom,
    navnFastlege: 'Victor Frankenstein',
    egenmeldt: false,
    papirsykmelding: false,
    harRedusertArbeidsgiverperiode: false,
    merknader: null,
    utdypendeOpplysninger: {
        '6.2': {
            '6.2.1': {
                sporsmal: 'Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.',
                svar: 'Langvarig korsryggsmerter. Ømhet og smerte',
                restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
            },
            '6.2.2': {
                sporsmal: 'Hvordan påvirker sykdommen arbeidsevnen',
                svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: d79c75bb-af99-4357-8b7d-b0d5cbfd8f1b',
                restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
            },
            '6.2.3': {
                sporsmal: 'Har behandlingen frem til nå bedret arbeidsevnen?',
                svar: 'Nei',
                restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
            },
            '6.2.4': {
                sporsmal: 'Beskriv Pågående og planlagt henvisning, utredning og/eller behandling',
                svar: 'Henvist til fysio',
                restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
            },
        },
    },
})

export const brukertestSoknad: RSSoknad = {
    id: '963e816f-7b3c-4513-818b-95595d84dd91',
    sykmeldingId: 'abc5acf2-a44f-42e5-87b2-02c9d0b39ce8',
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: fom,
    tom: tom,
    opprettetDato: '2022-11-17',
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: fom,
    sykmeldingUtskrevet: fom,
    arbeidsgiver: { navn: `${hovedjobb}`, orgnummer: '967170232' },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: fom,
            tom: tom,
            grad: 100,
            sykmeldingstype: 'AKTIVITET_IKKE_MULIG',
        },
    ],
    sporsmal: [
        {
            id: '1623807',
            tag: 'ANSVARSERKLARING',
            sporsmalstekst:
                'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
            undertekst: null,
            svartype: 'CHECKBOX_PANEL',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        {
            id: '1623834',
            tag: 'FRAVAR_FOR_SYKMELDINGEN',
            sporsmalstekst: `Var du syk og borte fra jobb før du ble sykmeldt, i perioden ${fravaerFoerTekst}?`,
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '1623835',
                    tag: 'FRAVAR_FOR_SYKMELDINGEN_NAR',
                    sporsmalstekst:
                        'Hvilke dager var du syk og borte fra jobb, før du ble sykmeldt? Du trenger bare oppgi dager før 8. september 2022.',
                    undertekst: null,
                    svartype: 'PERIODER',
                    min: '2022-08-08',
                    max: '2022-09-07',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        {
            id: '1623808',
            tag: 'TILBAKE_I_ARBEID',
            sporsmalstekst: `Var du tilbake i fullt arbeid hos ${hovedjobb} i løpet av perioden ${periodeTekst}?`,
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: true,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '1623809',
                    tag: 'TILBAKE_NAR',
                    sporsmalstekst: 'Når begynte du å jobbe igjen?',
                    undertekst: null,
                    svartype: 'DATO',
                    min: fom,
                    max: tom,
                    pavirkerAndreSporsmal: true,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        {
            id: '1623810',
            tag: 'FERIE_V2',
            sporsmalstekst: `Tok du ut feriedager i tidsrommet ${periodeTekst}?`,
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '1623811',
                    tag: 'FERIE_NAR_V2',
                    sporsmalstekst: 'Når tok du ut feriedager?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    min: fom,
                    max: tom,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        {
            id: '1623812',
            tag: 'PERMISJON_V2',
            sporsmalstekst: `Tok du permisjon mens du var sykmeldt ${periodeTekst}?`,
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '1623813',
                    tag: 'PERMISJON_NAR_V2',
                    sporsmalstekst: 'Når tok du permisjon?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    min: fom,
                    max: tom,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        {
            id: '1623814',
            tag: 'UTLAND_V2',
            sporsmalstekst: `Var du på reise utenfor EØS mens du var sykmeldt ${periodeTekst}?`,
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '1623815',
                    tag: 'UTLAND_NAR_V2',
                    sporsmalstekst: 'Når var du utenfor EØS?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    min: fom,
                    max: tom,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        {
            id: '1623841',
            tag: 'JOBBET_DU_100_PROSENT_0',
            sporsmalstekst: `I perioden ${periodeTekst} var du 100 % sykmeldt fra ${hovedjobb}. Jobbet du noe i denne perioden?`,
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '1623843',
                    tag: 'HVOR_MYE_HAR_DU_JOBBET_0',
                    sporsmalstekst: `Hvor mye jobbet du tilsammen ${periodeTekst}?`,
                    undertekst: 'Velg timer eller prosent',
                    svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [
                        {
                            id: '1623844',
                            tag: 'HVOR_MYE_TIMER_0',
                            sporsmalstekst: 'Timer',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [
                                {
                                    id: '1623845',
                                    tag: 'HVOR_MYE_TIMER_VERDI_0',
                                    sporsmalstekst: null,
                                    undertekst: null,
                                    svartype: 'TALL',
                                    min: '1',
                                    max: '300',
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [],
                                    undersporsmal: [],
                                },
                            ],
                        },
                        {
                            id: '1623846',
                            tag: 'HVOR_MYE_PROSENT_0',
                            sporsmalstekst: 'Prosent',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [
                                {
                                    id: '1623847',
                                    tag: 'HVOR_MYE_PROSENT_VERDI_0',
                                    sporsmalstekst: null,
                                    undertekst: null,
                                    svartype: 'TALL',
                                    min: '1',
                                    max: '99',
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [],
                                    undersporsmal: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: '1623842',
                    tag: 'HVOR_MANGE_TIMER_PER_UKE_0',
                    sporsmalstekst:
                        'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
                    undertekst: null,
                    svartype: 'TALL',
                    min: '1',
                    max: '150',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
            ],
        },
        {
            id: '1623836',
            tag: 'ARBEID_UTENFOR_NORGE',
            sporsmalstekst: 'Har du arbeidet i utlandet i løpet av de siste 12 månedene?',
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
            id: 'ed62a3b3-4203-3b61-a684-2300bea2ffac',
            tag: 'ANDRE_INNTEKTSKILDER_V2',
            sporsmalstekst: `Har du andre inntektskilder enn ${hovedjobb}?`,
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: 'd25b338d-9a9a-379f-b474-517738a9523b',
                    tag: 'HVILKE_ANDRE_INNTEKTSKILDER',
                    sporsmalstekst:
                        'Velg inntektskildene som passer for deg. Finner du ikke noe som passer for deg, svarer du nei',
                    undertekst: null,
                    svartype: 'CHECKBOX_GRUPPE',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [
                        {
                            id: 'd9ac4359-5519-34f1-b59d-b5ab24e55821',
                            tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
                            sporsmalstekst: 'ansatt et annet sted enn nevnt over',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: '989711be-5362-3f24-a02a-f1b3e3c31f99',
                            tag: 'INNTEKTSKILDE_SELVSTENDIG',
                            sporsmalstekst: 'selvstendig næringsdrivende',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: '3e710b2b-1e91-3d62-8d5d-55cb5eef120f',
                            tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA',
                            sporsmalstekst: 'dagmammma',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: 'c1a746d9-bd9f-396a-99b9-18feece3b9cc',
                            tag: 'INNTEKTSKILDE_JORDBRUKER',
                            sporsmalstekst: 'jordbruk / fiske / reindrift',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: 'ab377350-e3fe-3e46-8eb7-d3bb38d6506d',
                            tag: 'INNTEKTSKILDE_FRILANSER',
                            sporsmalstekst: 'frilanser',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: '7b4d4adc-de4f-38fd-a997-e5337fbb9555',
                            tag: 'INNTEKTSKILDE_OMSORGSLONN',
                            sporsmalstekst: 'omsorgslønn fra kommunen',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: '7b4d4adc-de4f-38fd-a997-e5337fbb9a5c',
                            tag: 'INNTEKTSKILDE_FOSTERHJEM',
                            sporsmalstekst: 'fosterhjemsgodtgjørelse',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [],
                            undersporsmal: [],
                        },
                        {
                            id: 'bb9418bf-8b6a-3472-9ae6-ecd464e86b7a',
                            tag: 'INNTEKTSKILDE_STYREVERV',
                            sporsmalstekst: 'styreverv',
                            undertekst: null,
                            svartype: 'CHECKBOX',
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
        },
        {
            id: '1623829',
            tag: 'UTDANNING',
            sporsmalstekst: `Har du vært under utdanning i løpet av perioden ${periodeTekst}?`,
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [],
            undersporsmal: [
                {
                    id: '1623830',
                    tag: 'UTDANNING_START',
                    sporsmalstekst: 'Når startet du på utdanningen?',
                    undertekst: null,
                    svartype: 'DATO',
                    min: null,
                    max: tom,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [],
                    undersporsmal: [],
                },
                {
                    id: '1623831',
                    tag: 'FULLTIDSSTUDIUM',
                    sporsmalstekst: 'Er utdanningen et fulltidsstudium?',
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
            id: '1623832',
            tag: 'VAER_KLAR_OVER_AT',
            sporsmalstekst: 'Viktig å være klar over:',
            undertekst:
                '<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href="https://www.nav.no/sykepenger" target="_blank">nav.no/sykepenger</a>.</p>',
            svartype: 'IKKE_RELEVANT',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [],
            undersporsmal: [],
        },
        {
            id: '1623833',
            tag: 'BEKREFT_OPPLYSNINGER',
            sporsmalstekst:
                'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
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
    egenmeldtSykmelding: false,
    opprettetAvInntektsmelding: false,
}

export const brukertest: Persona = {
    soknader: [brukertestSoknad],
    sykmeldinger: [brukertestSykmelding],
    kontonummer: '12340000000',
}
