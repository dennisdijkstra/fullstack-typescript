import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '../components/TextField';

const Login = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Username:"
                type="text"
                name="username"
                placeholder="username"
                register={register}
            />
            <TextField
                label="Password:"
                type="password"
                name="password"
                placeholder="password"
                register={register}
            />
            <button type="submit">Login</button>
        </form>
    )
};

export default Login;