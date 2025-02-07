import React from "react";

import './SendButton.css';

export interface SendButtonProps {
    label: string;
    onClick: () => void;
    disabled: boolean;
}

const SendButton = ({label, onClick, disabled}: SendButtonProps) => {
    const buttonClasses = ['send-button', disabled && 'disabled'].filter(Boolean).join(' ');
    return (
        <button className={buttonClasses} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};

export default SendButton;