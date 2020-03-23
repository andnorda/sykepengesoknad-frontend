import React from 'react';
import { render, screen } from '@testing-library/react';
import { TargetElement } from '@testing-library/user-event';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import { TestProvider } from '../../test-provider';
import '@testing-library/jest-dom/extend-expect';

describe('<Soknaden /> som er sendt', () => {
    let mock: FetchMock;
    let spy: SpyMiddleware;

    beforeEach(() => {
        spy = new SpyMiddleware();
        mock = FetchMock.configure({
            middleware: spy.middleware
        });
        expect(spy.size()).toBe(0);
    });

    afterEach(() => {
        mock.restore();
    });

    test('Rendrer side', () => {
        const { container } = render(<TestProvider path="soknader/2d1b9ab0-fa76-4738-9e07-3a684d141628/1" />);
        expect(screen.getAllByText('Søknader om sykepenger')).toBeTruthy();

        const inngangspanel = 'a.inngangspanel[href*="710acaea-abef-4e6f-be83-bd9e0c3c1e3a"]';
        const elm: TargetElement = container.querySelector(inngangspanel);
        expect(elm).toBeInTheDocument();
    });
});