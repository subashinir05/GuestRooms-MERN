import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';

export default function Profile() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function signout() {
        await axios.post('/signout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return 'Loading...';
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/signin'} />;
    }
    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="container mx-auto mt-10 p-5 font-serif">
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto mt-8">
                    <p className="text-2xl mb-4">Logged in as <span className="font-semibold"> {user.name}</span></p>
                    <button 
                        onClick={signout} 
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                        Sign Out
                    </button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}
