import React from "react";
import { useSelector } from "react-redux";

import Login from "./login/Login";
import { UserStateSlice } from "../../utils/interfaces";
import Logout from "./logout/Logout";
import Signup from "./signup/Signup";

import './Navbar.css';

const Navbar: React.FC = () => {
    const user = useSelector((state: UserStateSlice) => state.user.user);
    return (
        <nav id='navbar'>
            {
                user ? (
                    <Logout username={user.username} />
                ) : (
                    <>
                        <Signup />
                        <Login />
                    </>
                )
            }
        </nav>
    )
};

export default Navbar