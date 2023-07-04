import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Dialog from '../../../components/dialog';

const dummyData = {
    callbackFn: jest.fn(),
    label: 'Dialog Label',
    description: 'Dialog Description'
}

describe('Dialog component', () => {
    it('renders correctly', () => {
        render(
            <Dialog
                callbackFn={dummyData.callbackFn}
                label={dummyData.label}
                description={dummyData.description}
            />
        );
        const dialog = screen.getByRole('dialog');

        expect(dialog).toBeInTheDocument();
    });

    it('handles callback', () => {
        const dialog = render(
            <Dialog
                callbackFn={dummyData.callbackFn}
                label={dummyData.label}
                description={dummyData.description}
            />
        );

        fireEvent.click(dialog.getByRole('button'));

        expect(dummyData.callbackFn).toHaveBeenCalled();
    });
});