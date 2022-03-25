import './ettersending.less'

import { Alert, Button, Heading, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'

import { redirectTilLoginHvis401 } from '../../data/rest/utils'
import { useAppStore } from '../../data/stores/app-store'
import env from '../../utils/environment'
import fetcher from '../../utils/fetcher'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'

interface EttersendingProps {
    gjelder: 'nav' | 'arbeidsgiver'
    setRerendrekvittering: (d: Date) => void
}

const Ettersending = ({ gjelder, setRerendrekvittering }: EttersendingProps) => {
    const { valgtSoknad, setValgtSoknad, soknader, setSoknader, setFeilmeldingTekst } = useAppStore()
    const [ vilEttersende, setVilEttersende ] = useState<boolean>(false)
    const [ ettersender, setEttersender ] = useState<boolean>(false)

    const hentTekst = (text: string) => {
        const tilSuffix = (gjelder === 'nav') ? '-nav' : '-arbeidsgiver'
        return tekst(`${text}${tilSuffix}` as any)
    }

    const oppdaterSoknad = () => {
        setValgtSoknad(valgtSoknad)
        soknader[soknader.findIndex(sok => sok.id === valgtSoknad!.id)] = valgtSoknad as any
        setSoknader(soknader)
        setFeilmeldingTekst('')
        setRerendrekvittering(new Date())
    }

    const ettersend = async() => {
        if (ettersender) return
        setEttersender(true)
        try {
            if (gjelder === 'nav') {
                await ettersendNav()
            } else if (gjelder === 'arbeidsgiver') {
                await ettersendArbeidsgiver()
            }
        } finally {
            setVilEttersende(false)
            setEttersender(false)
        }
    }

    const ettersendNav = async() => {
        const res = await fetcher(env.flexGatewayRoot() + `/syfosoknad/api/soknader/${valgtSoknad!.id}/ettersendTilNav`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })

        if (redirectTilLoginHvis401(res)) {
            return
        } else if (res.ok) {
            valgtSoknad!.sendtTilNAVDato = new Date()
            oppdaterSoknad()
        } else {
            logger.error('Feil ved ettersending til NAV', res)
            setFeilmeldingTekst(tekst('kvittering.ettersending.feilet'))
        }
    }

    const ettersendArbeidsgiver = async() => {
        const res = await fetcher(env.flexGatewayRoot() + `/syfosoknad/api/soknader/${valgtSoknad!.id}/ettersendTilArbeidsgiver`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })
        if (redirectTilLoginHvis401(res)) {
            return
        } else if (res.ok) {
            valgtSoknad!.sendtTilArbeidsgiverDato = new Date()
            oppdaterSoknad()
        } else {
            logger.error('Feil ved ettersending til ARBEIDSGIVER', res)
            setFeilmeldingTekst(tekst('kvittering.ettersending.feilet'))
        }
    }

    return (<>
        <Button variant="secondary" onClick={() => {
            setVilEttersende(true)
        }}>
            {tekst(`kvittering.knapp.send-${gjelder}` as any)}
        </Button>

        <Modal onClose={() => setVilEttersende(false)}
            className="ettersending"
            open={vilEttersende}
        >
            <Modal.Content>
                <Heading spacing size="small" level="3" className="modal__tittel">
                    {hentTekst('kvittering.tittel.send-til')}
                </Heading>
                <Alert variant="info">{hentTekst('kvittering.info.send-til')}</Alert>
                <Button variant="primary" loading={ettersender} onClick={ettersend}>
                    {hentTekst('kvittering.knapp.bekreft.send-til')}
                </Button>
                <Button variant="tertiary" className="lenkeknapp" onClick={() => setVilEttersende(false)}>
                    {tekst('kvittering.knapp.angre')}
                </Button>
            </Modal.Content>
        </Modal>
    </>)
}

export default Ettersending
