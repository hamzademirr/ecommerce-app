import { Button } from '@chakra-ui/react';
import React from 'react'
import { NavLink, Outlet } from "react-router-dom";
import './styles.css'

function Admin() {
    return (
        <>
            <div id='content'>
                <nav>
                    <ul className='admin-menu'>
                        <li>
                            <NavLink to='/admin/orders'>
                                <Button colorScheme='purple'>Orders</Button>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/admin/products'>
                                <Button colorScheme='purple'>Products</Button>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet />
        </>
    )
}

export default Admin