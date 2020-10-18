import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";
import TextField from '../components/TextField';

const REGISTER = gql`
    mutation Register($options: UsernamePasswordInput!) {
        register(options: $options) {
            errors {
                field
                message
            }
            user {
                id
                username
            }
        }
    }
`;

const Register = () => {
    const [registerUser, { data }] = useMutation(REGISTER);
    const router = useRouter();
    const { register, handleSubmit, setError, clearErrors, errors } = useForm();

    const onSubmit = async (data) => {
        const response = await registerUser({ variables: { options: data } });

        if (response.data?.register.errors) {
            const [{ field, message }] = response.data.register.errors;

            setError(field, { message });
          } else if (response.data?.register.user) {
            router.push('/');
          }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Username:"
                type="text"
                name="username"
                placeholder="username"
                register={register}
            />
            {errors.username && <p>{errors.username.message}</p>}
            <TextField
                label="Email:"
                type="text"
                name="email"
                placeholder="email"
                register={register}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <TextField
                label="Password:"
                type="password"
                name="password"
                placeholder="password"
                register={register}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <button type="submit">Register</button>
        </form>
    )
};

export default Register;