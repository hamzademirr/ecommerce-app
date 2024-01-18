import React from 'react'
import styles from "./styles.module.css"
import { Button } from '@chakra-ui/react'
import {
    NavLink,
    Outlet
} from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { useBasket } from '../../context/BasketContext';

function Navbar() {
    const { loggedIn, user } = useAuth();
    const { items } = useBasket();
    console.log(loggedIn);
    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <NavLink to="/">eCommerce</NavLink>
                    </div>
                    <ul className={styles.menu}>
                        <li>
                            <NavLink to="/">Products</NavLink>
                        </li>
                    </ul>
                </div>

                <div className={styles.right}>
                    {
                        !loggedIn ? (<>
                            <NavLink to="login">
                                <Button colorScheme='purple'>Login</Button>
                            </NavLink>
                            <NavLink to="register">
                                <Button colorScheme='purple'>Register</Button>
                            </NavLink>
                        </>) : (<>
                            {
                                items.length > 0 && (
                                    <NavLink to='/basket'>
                                        <Button colorScheme='purple' variant='outline'>Basket ({items.length})</Button>
                                    </NavLink>
                                )
                            }

                            {
                                user?.role === 'admin' && (
                                    <NavLink to='/admin'>
                                        <Button colorScheme='purple' variant='ghost'>Admin</Button>
                                    </NavLink>
                                )
                            }

                            <NavLink to='/profile'>
                                <Button colorScheme='purple'>Profile</Button>
                            </NavLink>
                        </>)
                    }
                </div>

            </nav>
            <Outlet />
        </>
    )
}

export default Navbar