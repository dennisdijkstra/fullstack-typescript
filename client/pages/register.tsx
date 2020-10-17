import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";

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
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const response = await registerUser({ variables: { options: data } });

        if (response.data?.register.errors) {
            console.log('show errors')
          } else if (response.data?.register.user) {
            router.push('/');
          }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    ref={register}
                    placeholder="username"
                />
            </label>
            <label>
                Email:
                <input
                    type="text"
                    name="email"
                    ref={register}
                    placeholder="email"
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    ref={register}
                    placeholder="password"
                />
            </label>
             <button type="submit">Register</button>
        </form>
    )
};

export default Register;