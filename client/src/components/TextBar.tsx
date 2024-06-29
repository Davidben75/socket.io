import React, { ChangeEvent, useState } from 'react';
import Message from '../models/message';

const TextBar = () => {
    const [messageSent, setMessageSent] =  useState<Message>({
        id : '',
        content : '',
        created : new Date
    });

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {  
        if(e.target.name = 'message'){
            setMessageSent(prev => ({
                ...prev,
                content : e.target.value
            }));
        }  
        
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(messageSent);
    }

    return (
        <form method='POST' onSubmit={handleSubmit}>
            <input 
                type="text" 
                name='message'
                onChange={handleChange}
                value={messageSent.content}
                />
            <button type='submit'> Send</button>
        </form>
    );
};

export default TextBar;