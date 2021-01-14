import Head from 'next'
import React from "react";
import {Navbar} from "../components/navbar";
import Link from "next";
import Image from "next/image";
import {useAuth} from "../hooks/useAuth";

export default function Home() {
    const auth = useAuth();

    return (
        <>
            <Navbar/>
            <div className='text-center pt-44 h-screen'>
                <h1 className='text-7xl text-green-400'>EasyFit</h1>
                <p className='text-lg pt-10 text-gray-800'>Votre compagnon sportif au quotidien.</p>
                {!auth.user ? (
                    <div className="py-8 flex justify-center space-x-10">
                        <button
                            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700">
                            <a href="/">
                                Se connecter
                            </a>
                        </button>
                        <button
                            className="group relative flex py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700">
                            <a href="/register">Créer un compte</a>
                        </button>
                    </div>
                ) : ""}
            </div>
            <div className="w-auto py-24 bg-gray-800">
                <div className="flex justify-center space-x-6">
                    <svg className="flex-shrink-0 h-14 w-14 text-green-500" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                    </svg>
                    <h1 className='text-5xl font-bold text-center text-white'>Enregistrez vos <span
                        className="text-green-400">performances</span></h1>
                </div>
                <p className='text-lg text-center pt-5 text-white'>Après votre activité physique, enregistrez vos
                    performances afin d'obtenir des statistiques détaillées et ainsi voir votre évolution.</p>
            </div>
        </>

    )
}
