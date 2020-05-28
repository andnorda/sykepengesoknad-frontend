import React from 'react';
import { OppsummeringProps } from '../oppsummering';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../../vis';
import { tilLesbarDatoUtenAarstall, tilLesbarPeriodeUtenArstall } from '../../../../utils/dato-utils';
import { RSSvar } from '../../../../types/rs-types/rs-svar';

const datoEllerIkkeTilBehandling = (svar: RSSvar) => {
    if (svar === undefined || svar.verdi === '') {
        return 'Ikke til behandling';
    }
    return tilLesbarDatoUtenAarstall(svar.verdi);
};

const Behandlingsdager = ({ sporsmal }: OppsummeringProps) => {
    return (
        <>
            <Vis hvis={sporsmal.undersporsmal !== undefined}>
                <div className='oppsummering__sporsmal'>
                    <Element tag='h3'>{sporsmal.sporsmalstekst}</Element>
                    <Vis hvis={sporsmal.undersporsmal.length > 0}>
                        <div className='oppsummering__undersporsmalsliste'>
                            {sporsmal.undersporsmal.map((uspm, idx) => {
                                return (
                                    <div className='oppsummering__sporsmal' key={idx}>
                                        <Element tag='h3'>{tilLesbarPeriodeUtenArstall(uspm.min, uspm.max)}</Element>
                                        <div className='oppsummering__tekstsvar'>
                                            <Normaltekst className='oppsummering__dato'>
                                                {datoEllerIkkeTilBehandling(uspm.svarliste.svar[ 0 ])}
                                            </Normaltekst>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Vis>
                </div>
            </Vis>
        </>
    )
};

export default Behandlingsdager;
