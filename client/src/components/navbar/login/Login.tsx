import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { AppDispatch } from "../../../store/store";
import { API_MAP, SERVER_URL } from "../../../utils/constants";
import { setUser } from "../../../store/userSlice";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const canLogin: boolean = !!username.trim() && !!password.trim();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/api/${API_MAP.authentication.login}`, {
                username: username,
                password: password
            });

            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Login failed, please try again');
        }
        setUsername('');
        setPassword('');
    }


    return (
        <div className='flex flex-col'>
            <label htmlFor='login-username'>Username:</label>
            <input
                type='text'
                placeholder='Enter username...'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor='login-password'>Password:</label>
            <input
                type='password'
                placeholder='Enter password...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className={['button', 'button-auth', !canLogin && 'disabled'].filter(Boolean).join(' ')}
                type='button'
                onClick={() => { 
                    if (!canLogin) {
                        return;
                    }

                    handleLogin();
                }}
                disabled={!canLogin}
            >
                Login
            </button>
        </div>
    );
}

export default Login;