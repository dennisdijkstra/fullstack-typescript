import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    register: () => void;
};

const TextField: React.FC<Props> = ({ label, name, type, placeholder, register }) => {

    return (
        <Field>
            <Label htmlFor={name}>{label}</Label>
            <Input
                type={type}
                name={name}
                ref={register}
                placeholder={placeholder}
            />
        </Field>
    );
};

export default TextField;

const Field = styled.div`
    margin-bottom: 12px;
`

const Label = styled.label`
    display: block;
    margin-bottom: 6px;
`

const Input = styled.input`
    padding: 6px 10px;
    margin-bottom: 12px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #000;
`
