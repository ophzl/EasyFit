import {useForm} from 'react-hook-form';
import React from "react";
import Head from 'next/head'
import {Navbar} from "../components/navbar";
import {useAuth} from "../hooks/useAuth";
import {useRouter} from "next/router";

const LoginForm = () => {
    const {register, errors, handleSubmit} = useForm();
    const auth = useAuth()
    const router = useRouter()

    const onSubmit = (data) => {
        auth.Login(data).then(() => {
            router.push('/')
        })
    }

    return (
        <>
            <Head>
                <title>EasyFit - Se connecter</title>
            </Head>
            <main>
                <Navbar/>
                <div className="min-h-full flex items-center justify-center py-14 bg-gray-50 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <img className="mx-auto h-12 w-auto"
                                 src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Se connecter
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Je n'ai pas de compte
                                </a>
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <input type="hidden" name="remember" value="true"/>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="pb-2">
                                    <label htmlFor="email" className="sr-only">Adresse e-mail</label>
                                    <input id="email" name="email" type="email" autoComplete="email" required placeholder="Adresse e-mail"
                                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                           ref={register({
                                               required: 'Please enter an email',
                                               pattern: {
                                                   value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                   message: 'Not a valid email',
                                               },
                                           })}/>
                                    {errors.email && (
                                        <div className="mt-2 text-xs text-red-600">
                                            {errors.email.message}
                                        </div>
                                    )}
                                </div>
                                <div className="pb-2">
                                    <label htmlFor="password" className="sr-only">Mot de passe</label>
                                    <input id="password" name="password" type="password" autoComplete="current-password"
                                           required
                                           placeholder="Mot de passe"
                                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                           ref={register({
                                               required: 'Please enter a password',
                                               minLength: {
                                                   value: 6,
                                                   message: 'Should have at least 6 characters',
                                               },
                                           })}/>
                                    {errors.password && (
                                        <div className="mt-2 text-xs text-red-600">
                                            {errors.password.message}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember_me" name="remember_me" type="checkbox"
                                           className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div>
                                <button type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Se connecter
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};
export default LoginForm;