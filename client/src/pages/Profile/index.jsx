import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Button, Heading } from '@chakra-ui/react';
import { useNavigate  } from "react-router-dom";

function Profile() {
    const { user, logout } = useAuth();
    const navigate  = useNavigate ();

    const handleLogout = async () => {
        logout();
        navigate('/login');
    }
    return (
        <div id='content'>
            <Heading as='h1'>Profile</Heading>
            <br />
            {user ? (
                <>
                    <p>id: {user._id}</p>
                    <p>Role: {user.role}</p>
                    <p>Email: {user.email}</p>
                </>
            ) : (
                <></>
            )

            }

            <br />
            <Button colorScheme='purple' variant='solid' onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Profile