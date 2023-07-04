import React from 'react';
import './style.scss';

interface IDialog {
    callbackFn: () => void,
    label: string;
    description: string;
}

const Dialog = (props: IDialog) => {
    const { callbackFn, label, description } = props;
    const onClickHandler = () => {
        callbackFn();
    };

    return (
        <div role="dialog" className='dialog'>
            <div className='dialog-box'>
                <h2 className='message'>{label}</h2>
                <p>{description}</p>
                <button className='btn-action btn-primary' onClick={onClickHandler}>OK</button>
            </div>
        </div>
    );
};
export default Dialog;