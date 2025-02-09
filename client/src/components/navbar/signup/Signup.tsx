import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { AppDispatch } from "../../../store/store";
import { API_MAP, SERVER_URL } from "../../../utils/constants";
import { setUser } from "../../../store/userSlice";

const Signup: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const canSignup: boolean = !!username.trim() && !!password.trim();
    const dispatch = useDispatch<AppDispatch>();

    const handleSignup = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/api/${API_MAP.authentication.signup}`, {
                username: username,
                password: password,
                email: email
            });

            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Signup failed, please try again');
        }
        setUsername('');
        setPassword('');
        setEmail('');
    }


    return (
        <div className='flex flex-col'>
            <label htmlFor='signup-email'>Email:</label>
            <input
                type='email'
                placeholder='Enter email...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor='signup-username'>Username:</label>
            <input
                type='text'
                placeholder='Enter username...'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor='signup-password'>Password:</label>
            <input
                type='password'
                placeholder='Enter password...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className={['button', 'button-auth', !canSignup && 'disabled'].filter(Boolean).join(' ')}
                type='button'
                onClick={() => { 
                    if (!canSignup) {
                        return;
                    }

                    handleSignup();
                }}
                disabled={!canSignup}
            >
                Signup
            </button>
        </div>
    );
}

export default Signup;