import React, {useState, useEffect} from "react";
import {Navbar} from "../components/navbar";
import {db} from "../db/firebase";
import {useAuth} from "../hooks/useAuth";

const ListExercises = () => {
    const auth = useAuth()
    const [ex, setEx] = useState([])

    useEffect(() => {
        if (auth.user) {
            getElements(db, auth).then(() => console.log('Successfully loaded exercises.'));
        }
        // return (() => {
        //     setEx([])
        // })
    }, [])

    async function getElements(db, auth) {
        const exercisesRefs = db.collection('users').doc(auth.user.uid).collection('exercises')
        const exercisesList = await exercisesRefs.get()
        let tmp = []
        exercisesList.forEach(doc => {
            tmp.push({id: doc.id, data: doc.data()});
        });
        setEx(tmp)
    }

    return (
        <>
            <ul>
                {ex.map((item) => {
                    return <li key={item.id}>{item.data.name}</li>
                })}
            </ul>
        </>
    );
};

export default ListExercises;