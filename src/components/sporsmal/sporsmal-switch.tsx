import React from 'react';
import TallKomp from './typer/tall-komp';
import DatoInput from './typer/dato-komp';
import JaNeiKomp from './typer/ja-nei-komp';
import { Sporsmal } from '../../types/types';
import UkjentSporsmal from './ukjent-sporsmal';
import CheckboxPanel from './typer/checkbox-panel';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import PeriodeInput from './typer/periode-komp';
import IkkeRelevant from './typer/ikke-relevant';
import CheckboxKomp from './typer/checkbox-komp';
import RadioKomp from './typer/radio-komp';
import JaNeiRadio from './typer/ja-nei-radio';
import './undersporsmal/undersporsmal.less';

interface UndersporsmalProps {
    sporsmal: Sporsmal;
}

const SporsmalSwitch = ({ sporsmal }: UndersporsmalProps) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX_PANEL:
            return <CheckboxPanel sporsmal={sporsmal} />;

        case RSSvartype.CHECKBOX:
        case RSSvartype.CHECKBOX_GRUPPE:
            return <CheckboxKomp sporsmal={sporsmal} />;

        case RSSvartype.DATO:
            return <DatoInput sporsmal={sporsmal} />;

        case RSSvartype.PERIODER:
            return <PeriodeInput sporsmal={sporsmal} />;

        case RSSvartype.JA_NEI:
            if (sporsmal.parentKriterie === 'CHECKED' || sporsmal.undersporsmal.length === 0) {
                return <JaNeiRadio sporsmal={sporsmal} />
            }
            return <JaNeiKomp sporsmal={sporsmal} />;

        case RSSvartype.TIMER:
        case RSSvartype.PROSENT:
        case RSSvartype.TALL:
            return <TallKomp sporsmal={sporsmal} />;

        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
            return <RadioKomp sporsmal={sporsmal} />;

        case RSSvartype.IKKE_RELEVANT:
            return <IkkeRelevant sporsmal={sporsmal} />;

        default:
            return <UkjentSporsmal sporsmal={sporsmal} />;
    }
};

export default SporsmalSwitch;