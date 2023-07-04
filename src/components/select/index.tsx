import React, { useEffect } from 'react';
import { useState } from 'react';
import { ISelection } from '../../interfaces/ISelection';
import './style.scss';

interface ISelect {
    label: string;
    options: string[];
    selection: ISelection;
    disabled: boolean;
    update: (ISelection) => void;
}

function Select(props: ISelect) {
    const { label, options, selection, update, disabled } = props;
    const [optionValue, setOptionValue] = useState('');
    const elID = `${label}`.trim().toLowerCase().replace(/\s/g, '') + 'ID';

    const onChangeHandler = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        update({ [label]: ev.target.value });
    };

    useEffect(() => {
        setOptionValue(selection[label] || '');
    }, [selection]);

    return (
        <>
            <label className='select-label' htmlFor={elID}>{label}</label>
            <div className='select'>
                <select
                    id={elID}
                    name={elID}
                    onChange={onChangeHandler}
                    value={optionValue}
                    disabled={disabled}
                >
                    <option value="" disabled selected>Select an item</option>
                    {
                        options.map(value => <option value={value} key={value}>{value}</option>)
                    }
                </select>
                <span className="focus"></span>
            </div>
        </>
    );
}

export default Select;
