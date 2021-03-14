import React from "react";
import { useState } from 'react'
import { Transition } from "@headlessui/react";
import { useAuth } from "../hooks/useAuth";
import { firebase } from "../db/firebase";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isUserpanelOpen, setIsUserpanelOpen] = useState(false)
    
    const auth = useAuth();

    return (
        <div className="relative bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div
                    className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="/">
                            <span className="sr-only">Workflow</span>
                            <img className="h-8 w-auto sm:h-10"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
                        </a>
                    </div>

                    {auth.user ? (
                        <nav className="hidden md:flex space-x-10">
                            <div className="relative">
                                <button type="button" onClick={() => setIsOpen(!isOpen)}
                                    className="group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    <span>Entraînement</span>
                                    <svg className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        aria-hidden="true">
                                        <path fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>

                                <Transition show={isOpen} enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0"
                                    leaving="transition ease-in duration-150"
                                    leavingFrom="opacity-100 translate-y-0" leavingTo="opacity-0 translate-y-1">
                                    <div
                                        className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                        <div
                                            className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                <a href="/saveExercise"
                                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                                    <svg className="flex-shrink-0 h-6 w-6 text-green-600"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    <div className="ml-4">
                                                        <p className="text-base font-medium text-gray-900">
                                                            Enregistrer mes données
                                                        </p>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            Enregistrez vos performances sportives.
                                                        </p>
                                                    </div>
                                                </a>
                                                <a href="/listExercises"
                                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                                    <svg className="flex-shrink-0 h-6 w-6 text-green-600"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <div className="ml-4">
                                                        <p className="text-base font-medium text-gray-900">
                                                            Voir mon historique
                                                        </p>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            Accédez à l'historique de vos entraînements.
                                                        </p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Transition>

                            </div>

                            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                Statistiques
                            </a>
                        </nav>
                    ) : ''}

                    {!auth.user ? (
                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                            <a href="/login"
                                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                Se connecter
                            </a>
                            <a href="/register"
                                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700">
                                Créer un compte
                            </a>
                        </div>
                    ) : (
                            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                                <button type="button" onClick={() => setIsUserpanelOpen(!isUserpanelOpen)}
                                    className="group bg-white text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none">
                                    <span>Bonjour, {auth.user.pseudo}</span>
                                </button>
                                <Transition show={isUserpanelOpen} enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0"
                                    leaving="transition ease-in duration-150"
                                    leavingFrom="opacity-100 translate-y-0" leavingTo="opacity-0 translate-y-1">
                                    <div
                                        className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-sm sm:px-0 lg:ml-0 lg:left-2/3">
                                        <div
                                            className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                <a href="#"
                                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                                    <svg className="flex-shrink-0 h-6 w-6 text-green-600"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <div className="ml-4">
                                                        <p className="text-base font-medium text-gray-900">
                                                            Voir mon profil
                                                    </p>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            Afficher mon profil
                                                    </p>
                                                    </div>
                                                </a>
                                                <a href="#"
                                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                                    <svg className="flex-shrink-0 h-6 w-6 text-green-600"
                                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    <div className="ml-4">
                                                        <button onClick={auth.logOut} className="text-base font-medium text-gray-900">
                                                            Déconnexion
                                                    </button>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}