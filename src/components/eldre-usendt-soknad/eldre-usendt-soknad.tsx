import { Alert } from '@navikt/ds-react'
import React from 'react'
import { Link } from 'react-router-dom'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { Soknad } from '../../types/types'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import { urlTilSoknad } from '../soknad/soknad-link'

interface EldreUsendtSoknadProps {
    eldreSoknad: Soknad
}

export const EldreUsendtSoknad = ({ eldreSoknad }: EldreUsendtSoknadProps) => {
    const { logEvent } = useAmplitudeInstance()

    logEvent('komponent vist', { komponent: 'eldre usendt søknad' })

    return (
        <Alert variant="warning">
            {tekst('eldre.usendt.alert')}
            <Link
                onClick={() =>
                    logEvent('navigere', {
                        lenketekst: tekst('eldre.usendt.gaa-til'),
                    })
                }
                to={urlTilSoknad(eldreSoknad)}
            >
                {tekst('eldre.usendt.gaa-til')}
            </Link>
        </Alert>
    )
}

export function harEldreUsendtSoknad(
    valgtSoknad: Soknad,
    soknader: Soknad[]
): Soknad | undefined {
    if (!valgtSoknad.fom) {
        return undefined
    }
    return soknader
        .filter(
            (s) =>
                s.status == RSSoknadstatus.NY ||
                s.status == RSSoknadstatus.UTKAST_TIL_KORRIGERING
        )
        .filter((s) => s.fom != null)
        .filter((s) => s.fom! < valgtSoknad.fom!)
        .sort((a, b) => a.fom!.getMilliseconds() - b.fom!.getMilliseconds())
        .find((s) => s.id != valgtSoknad.id)
}
