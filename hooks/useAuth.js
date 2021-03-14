import React, {
    useState,
    useEffect,
    useContext,
    createContext,
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

    const handleAuthStateChanged = (userData) => {
        if (userData) {
            getUserAdditionalData(userData.uid);
        }
    };
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
        return () => unsub();
    }, []);

    const getUserAdditionalData = (userUid) => {
        return db
            .collection('users')
            .doc(userUid)
            .get()
            .then((userData) => {
                if (userData.data()) {
                    setUser(userData.data());
                }
            });
    };

    const createUser = (user) => {
        return db
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
                 return createUser({uid: res.user.uid, email: email, pseudo: pseudo})
            }).then(() => console.log("User successfully created."))
            .catch((error) => {
                return {error};
            });
    };

    const login = ({ email, password }) => {
        console.log("Login func")
        return auth
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
                getUserAdditionalData(user).then(r => console.log(r));
                return response.user;
            }).then(() => console.log('Successfully logged in.'))
            .catch((error) => {
                return { error };
            });
    };

    const logOut = () => {
        return auth.signOut().then(() => {
            console.log("Successfully logged out.")
            setUser(false)
        }).catch((e) => {
            console.log(e)
        })
    }

    return {
        user,
        signUp,
        login,
        logOut
    };
}