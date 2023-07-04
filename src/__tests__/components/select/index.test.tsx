import React from 'react';
import { fireEvent, getAllByRole, render, screen } from '@testing-library/react'
import Select from '../../../components/select';

const dummyData = {
    label: 'type',
    options: ['car', 'airplane', 'train'],
    selection: {},
    update: jest.fn(),
    disabled: false,
};

describe('Select component', () => {
    it('renders correctly', () => {
        render(
            <Select
                label={dummyData.label}
                options={dummyData.options}
                selection={dummyData.selection}
                update={dummyData.update}
                disabled={dummyData.disabled}
            />
        );
        const select = screen.getByRole('combobox');

        expect(select).toBeInTheDocument();
    });

    it('handles callback', () => {
        render(
            <Select
                label={dummyData.label}
                options={dummyData.options}
                selection={dummyData.selection}
                update={dummyData.update}
                disabled={dummyData.disabled}
            />
        );
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: dummyData.options[0] } })
        const selectOptions = getAllByRole(select, 'option');

        expect((selectOptions[0] as HTMLOptionElement).selected).toBeTruthy();
        expect((selectOptions[1] as HTMLOptionElement).selected).toBeFalsy()
        expect((selectOptions[2] as HTMLOptionElement).selected).toBeFalsy();
        expect(dummyData.update).toHaveBeenCalledWith({
            [dummyData.label]: dummyData.options[0]
        });
    });

    it('be disabled', () => {
        render(
            <Select
                label={dummyData.label}
                options={dummyData.options}
                selection={dummyData.selection}
                update={dummyData.update}
                disabled={true}
            />
        );
        const select = screen.getByRole('combobox');

        expect(select).toBeDisabled();
    });
});