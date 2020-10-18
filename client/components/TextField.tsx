import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Input = styled.input`
    margin-bottom: 12px;
`
const Label = styled.label`
    display: block;
    margin-bottom: 6px;
`

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    register: () => void;
};

const TextField: React.FC<Props> = ({ label, name, type, placeholder, register }) => {

    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <Input
                type={type}
                name={name}
                ref={register}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextField;
