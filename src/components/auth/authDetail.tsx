import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { useEffect, useState, ReactNode } from 'react';
import { auth } from '../../firebase';

interface AuthDetailProps {
    children: ReactNode;
}

export const AuthDetail = ({ children }: AuthDetailProps): JSX.Element => {
    const [authUser, setAuthUser] = useState<User | null>(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        }
    }, []);

    const UserSignOut = () => {
        signOut(auth).then(() => {
            console.log('User Signed Out');
        }).catch((error) => console.log(error));
    };

    return (
        <div className='signInInfo'>
            {authUser ? <><p>Signed In as {authUser.email}</p><button onClick={UserSignOut}>Sign Out</button>{children}</> : <p>Signed Out</p>}
        </div>
    );
};