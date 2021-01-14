import Head from "next";
import React from "react";
import {Navbar} from "../components/navbar";
import {db} from "../db/firebase";
import {useAuth} from "../hooks/useAuth";

const ListExercises = () => {
    const auth = useAuth()
    const exercises = []

    async function getElements(db, auth) {
        const exercisesRefs = db.collection('users').doc(auth.user.uid).collection('exercises')
        const exercisesList = await exercisesRefs.get()
        exercisesList.forEach(doc => {
            exercises.push({id: doc.id, data: doc.data()});
        });
    }

    if (auth.user) {
        getElements(db, auth).then(() => console.log('Successfully loaded exercises.'));
    }

    const ex = exercises.map((item) => <li key={item.id}>{item.data.name}</li>)

    console.log(ex);
    return (
        <>
            <Navbar/>
            <ul>
                {ex}
            </ul>
        </>
    );
};

export default ListExercises;