import React from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../../store/store";
import { logoutUser } from "../../../store/userSlice";

export interface LogoutProps {
    username: string;
}

const Logout: React.FC<LogoutProps> = ({ username }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = () => {
        dispatch(logoutUser());
    }
    
    return (
        <div>
            Hi {username}!
            <button
                className='button button-auth'
                type='button'
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
};

export default Logout;