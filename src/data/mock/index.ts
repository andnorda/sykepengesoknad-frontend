import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { soknader } from './data/soknader-arbeidstaker-15086801482';
import { sykmeldinger } from './data/sykmeldinger-arbeidstaker-15086801482';
import { unleashToggles } from './data/toggles';
import { SYFO_API_SOKNADER } from '../../utils/constants';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(500),
        MiddlewareUtils.loggingMiddleware()
    )
});

mock.get('/login', '/sykepengesoknad');
mock.post('/syfounleash/', unleashToggles);
mock.get(SYFO_API_SOKNADER, soknader);
mock.get('/syforest/sykmeldinger', sykmeldinger);
