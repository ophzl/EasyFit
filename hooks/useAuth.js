import React, {
    useState,
    useEffect,
    useContext,
    createContext,
    ReactNode,
} from 'react';
import {auth, db} from '../db/firebase';
const authContext = createContext({ user: {} });
const { Provider } = authContext;

export function AuthProvider(props) {
    const auth = useAuthProvider();
    return <Provider value={auth}>{props.children}</Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

const useAuthProvider = () => {
    const [user, setUser] = useState(null);

    const handleAuthStateChanged = (user) => {
        setUser(user);
        if (user) {
            getUserAdditionalData(user);
        }
    };
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

        return () => unsub();
    }, []);

    const getUserAdditionalData = (user) => {
        return db
            .collection('users')
            .doc(user.uid)
            .get()
            .then((userData) => {
                if (userData.data()) {
                    setUser(userData.data());
                }
            });
    };

    const createUser = (user) => {
        db
            .collection('users')
            .doc(user.uid)
            .set(user)
            .then(() => {
                console.log("Success")
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const signUp = ({pseudo, email, password}) => {
        return auth
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
                createUser({uid: res.user.uid, email: email, pseudo: pseudo})
            })
            .catch((error) => {
                return {error};
            });
    };

    const Login = ({ email, password }) => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
                getUserAdditionalData(response.user).then(r => console.log(r));
                return response.user;
            })
            .catch((error) => {
                return { error };
            });
    };


    return {
        user,
        signUp,
        Login
    };
}