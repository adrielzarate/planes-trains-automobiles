import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import App from '../App';

describe('App component', () => {
    it('renders correctly', () => {
        render(<App />);
        const AppTitle = screen.getByRole('heading', { level: 1 });
        expect(AppTitle).toHaveTextContent('Traffic Meister');
    });

    it('show loader', () => {
        render(<App />);
        const loader = screen.getByRole('status');
        expect(loader).toBeInTheDocument();
    });

    it('show enable select elements when data load', async () => {
        render(<App />);
        const select = screen.getAllByRole('combobox')[0];
        expect(select).toBeDisabled();
        await waitForElementToBeRemoved(() => screen.getByRole('status')).then(() => {
            expect(select).not.toBeDisabled();
        });
    });
});