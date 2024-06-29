import React, { ChangeEvent, useState } from 'react';

interface LoginInfo {
    username : string,
    password : string,
}

type InputType = 'text' | 'password'

const Login = () => {
    const [login , setLogin] = useState<LoginInfo>({
        username : '',
        password : ''
    });
    const [inputTypeChange, setInputTypeChange] = useState<InputType>('password')
 
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLogin(prevState => ({
            ...prevState,
            [name] : value
        }))
    }

    const handleChangeInputType = () => {
        setInputTypeChange(prev => (prev == 'password' ? 'text' : 'password'));
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(login);
    };

    return (
        <form action="POST" onSubmit={handleSubmit}>
            <label htmlFor="username">
                Email or Username :

                <input 
                    type="text" 
                    name='username' 
                    onChange={handleChange} 
                    value={login.username}
                    />   
                
            </label>

            <label htmlFor="password">
                Password
                <input 
                    type={inputTypeChange} 
                    name='password' 
                    onChange={handleChange} 
                    value={login.password}
                    />   
                
            </label>

            <button 
                type="button" 
                onClick={handleChangeInputType} 
                >
                {inputTypeChange === 'password' ? 'Voir' : 'Caché'}
            </button>
                
        </form>
        
    );
};

export default Login;