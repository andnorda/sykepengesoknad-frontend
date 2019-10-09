import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Brodsmule, Soknad } from '../../types/types';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import Banner from '../../components/banner/banner';
import Feilmelding from '../../components/feilmelding';
import { HotjarTrigger } from '../../components/hotjar-trigger';
import { HotjarTriggerType } from '../../types/enums';
import { useAppStore } from '../../data/stores/app-store';
import { IdParams } from '../../utils/util-props';
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype';
import Vis from '../../utils/vis';
import tekster from './soknaden-tekster';

const brodsmuler: Brodsmule[] = [{
    tittel: tekster['soknader.sidetittel'],
    sti: '/',
    erKlikkbar: true
}, {
    tittel: tekster['soknad.sidetittel'],
    sti: null,
    erKlikkbar: false,
}];

const Soknaden = (props: RouteComponentProps<IdParams>) => {
    const { soknader } = useAppStore();
    const soknad = soknader.filter(soknad => soknad.id === props.match.params.id)[0];

    return (
        <Vis hvis={soknad.status === RSSoknadstatus.NY || soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING}>
            <div className="limit">
                <Banner soknad={soknad} brodsmuler={brodsmuler}/>
                <TriggerByType soknad={soknad} sti={props.location.pathname}/>
            </div>
        </Vis>
    )
};

export default Soknaden;

interface TriggerProps {
    soknad: Soknad;
    sti: string;
}

const TriggerByType = ({ soknad, sti }: TriggerProps) => {
    console.log('soknad.soknadstype', soknad.soknadstype); //eslint-disable-line
    switch (soknad.soknadstype) {
        case RSSoknadstype.ARBEIDSTAKERE: {
            return (
                <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_ARBEIDSTAKER}>
                    <Innholdstittel>SoknadArbeidstaker</Innholdstittel>
                </HotjarTrigger>
            )
        }
        case RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE: {
            return (
                <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_FRILANSER_NAERINGSDRIVENDE}>
                    <Innholdstittel>SoknadSelvstendig</Innholdstittel>
                </HotjarTrigger>
            )
        }
        case RSSoknadstype.OPPHOLD_UTLAND: {
            return (
                <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_OPPHOLD_UTENFOR_NORGE}>
                    <Innholdstittel>SoknadUtlandSkjemaContainer</Innholdstittel>
                </HotjarTrigger>
            )
        }
        case RSSoknadstype.ARBEIDSLEDIG: {
            return (
                <HotjarTrigger hotjarTrigger={HotjarTriggerType.SOKNAD_ARBEIDSLEDIG}>
                    <Innholdstittel>SoknadArbeidsledig</Innholdstittel>
                </HotjarTrigger>
            )
        }
        default:
            return <Feilmelding/>;
    }
};
