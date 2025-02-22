import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import parser from 'html-react-parser'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import { useAppStore } from '../../data/stores/app-store'
import fetchMedRequestId, { AuthenticationError } from '../../utils/fetch'
import { tekst } from '../../utils/tekster'
import { RouteParams } from '../../app'
import useSoknad from '../../hooks/useSoknad'

interface EttersendingProps {
    gjelder: 'nav' | 'arbeidsgiver'
    setRerendrekvittering: (d: Date) => void
}

const Ettersending = ({ gjelder, setRerendrekvittering }: EttersendingProps) => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const queryClient = useQueryClient()

    const { setFeilmeldingTekst } = useAppStore()
    const [vilEttersende, setVilEttersende] = useState<boolean>(false)
    const [ettersender, setEttersender] = useState<boolean>(false)
    const knappeTekst = tekst(`kvittering.knapp.send-${gjelder}` as any)

    const hentTekst = (text: string) => {
        const tilSuffix = gjelder === 'nav' ? '-nav' : '-arbeidsgiver'
        return tekst(`${text}${tilSuffix}` as any)
    }

    const oppdaterSoknad = async () => {
        queryClient.invalidateQueries(['soknad', valgtSoknad!.id])
        queryClient.invalidateQueries(['soknader'])

        setFeilmeldingTekst('')
        setRerendrekvittering(new Date())
    }

    const ettersend = async () => {
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

    const ettersendNav = async () => {
        try {
            await fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/ettersendTilNav`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                setFeilmeldingTekst(tekst('kvittering.ettersending.feilet'))
                logger.warn(e)
            }
            return
        } finally {
            setFeilmeldingTekst('')
        }

        oppdaterSoknad()
    }

    const ettersendArbeidsgiver = async () => {
        try {
            await fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${
                    valgtSoknad!.id
                }/ettersendTilArbeidsgiver`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        } catch (e: any) {
            if (!(e instanceof AuthenticationError)) {
                setFeilmeldingTekst(tekst('kvittering.ettersending.feilet'))
                logger.warn(e)
            }
            return
        } finally {
            setFeilmeldingTekst('')
        }

        oppdaterSoknad()
    }

    return (
        <>
            <Button
                variant="tertiary"
                onClick={() => {
                    setVilEttersende(true)
                }}
            >
                {knappeTekst}
            </Button>

            <Modal
                onClose={() => setVilEttersende(false)}
                className="ettersending"
                open={vilEttersende}
                aria-labelledby="modal-tittel"
            >
                <Modal.Content>
                    <Heading size="small" level="1" id="modal-tittel" spacing>
                        {knappeTekst}
                    </Heading>
                    <BodyShort>{parser(hentTekst('kvittering.info.send-til'))}</BodyShort>
                    <Button size="small" variant="primary" loading={ettersender} onClick={ettersend}>
                        {hentTekst('kvittering.knapp.bekreft.send-til')}
                    </Button>
                    <Button variant="tertiary" className="lenkeknapp" onClick={() => setVilEttersende(false)}>
                        {tekst('kvittering.knapp.angre')}
                    </Button>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default Ettersending
