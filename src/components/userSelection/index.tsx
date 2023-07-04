import React, { useEffect, useState } from 'react';
import './style.scss';

function UserSelection({ selection }) {
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        const { colors, brand, type } = selection;
        const colorDescription = colors ? colors : '';
        const brandDescription = brand ? brand : '';
        const typeDescription = type ? type : 'vehicle';
        const description = `${colorDescription} ${brandDescription} ${typeDescription}`;
        setDescription(description);
    }, [selection]);

    return (
        <p>Your selected a {description}</p>
    );
}

export default UserSelection;
