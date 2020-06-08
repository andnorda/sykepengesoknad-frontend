import React from 'react';
import { OppsummeringProps } from '../oppsummering';
import { Element } from 'nav-frontend-typografi';

const LandSum = ({ sporsmal }: OppsummeringProps) => {
    const svar = sporsmal.svarliste.svar;
    if (typeof svar[0].verdi !== 'string') {
        return null;
    }

    const svarliste = svar.length === 1
        ? <p className='sist'>{svar[0].verdi}</p>
        : (
            <ul className='oppsummering__landliste'>
                {sporsmal.svarliste.svar.map((s) => {
                    return <li className='oppsummering__land' key={s.verdi.toString()}>{s.verdi}</li>;
                })}
            </ul>
        );
    return (
        <div className='oppsummering__fritekst'>
            <Element tag='h3'>{sporsmal.sporsmalstekst}</Element>
            <div className='oppsummering__tekstsvar'>{svarliste}</div>
        </div>
    );
};

export default LandSum;