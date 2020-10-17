import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Username:
                <input type="text" name="username" ref={register} />
            </label>
            <label>
                Password:
                <input type="password" name="password" ref={register} />
            </label>
        </form>
    )
};

export default Login;