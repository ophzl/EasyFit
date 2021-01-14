import {useForm} from 'react-hook-form';
import React from "react";
import {db, firebase, now} from '../db/firebase'
import Head from 'next/head'
import {Navbar} from "../components/navbar";
import {useRouter} from "next/router";
import {useAuth} from "../hooks/useAuth";

const SaveExercise = () => {
    const {register, errors, handleSubmit} = useForm();
    const router = useRouter()
    const auth = useAuth()

    const saveExercise = (data, date) => {
        data['date'] = date;
        db
            .collection('users')
            .doc(auth.user.uid)
            .collection('exercises')
            .doc(data.uid)
            .set(data)
            .then(() => {
                console.log("Success")
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const onSubmit = (data) => {
        const date = new Date()
        saveExercise(data,date)
    };

    return (
        <>
            <Head>
                <title>EasyFit - Enregistrer un exercice</title>
            </Head>
            <main>
                <Navbar/>
                <div className="min-h-full flex items-center justify-center py-14 bg-gray-50 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <img className="mx-auto h-12 w-auto"
                                 src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Enregistrer un exercice
                            </h2>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="pb-2">
                                    <label htmlFor="name" className="sr-only">Nom de l'exercice</label>
                                    <select id="name" name="name" required placeholder="Nom de l'exercice"
                                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                           ref={register({
                                               required: 'Veuillez choisir le nom de l\'exercice.',
                                           })}>
                                        <option value="press-ups">Pompes</option>
                                        <option value="crunches">Abdos</option>
                                        <option value="squats">Squats</option>
                                        <option value="other">Autre</option>
                                    </select>
                                    {errors.name && (
                                        <div className="mt-2 text-xs text-red-600">
                                            {errors.name.message}
                                        </div>
                                    )}
                                </div>
                                <div className="pb-2">
                                    <label htmlFor="duration" className="sr-only">Temps passé</label>
                                    <input id="duration" name="duration" type="number" min={0} required placeholder="Temps passé (min)"
                                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                           ref={register({
                                               required: 'Vous devez entrer une durée valide.',
                                           })}/>
                                    {errors.duration && (
                                        <div className="mt-2 text-xs text-red-600">
                                            {errors.duration.message}
                                        </div>
                                    )}
                                </div>
                                <div className="pb-2">
                                    <label htmlFor="repetitions" className="sr-only">Nombre de répétitions</label>
                                    <input id="repetitions" name="repetitions" type="number" min={0}
                                           required
                                           placeholder="Nombre de répétitions"
                                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                           ref={register({
                                               required: 'Vous devez entrer un nombre de répétitions.',
                                           })}/>
                                    {errors.repetitions && (
                                        <div className="mt-2 text-xs text-red-600">
                                            {errors.repetitions.message}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Enregistrer
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};
export default SaveExercise;