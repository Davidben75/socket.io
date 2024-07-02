import React, { ChangeEvent, useContext, useState } from 'react';
import Message from '../models/message';
import SocketContext from '../contexts/Socket/Context';

interface TextBarProps {
  uid: string;
}

const TextBar: React.FC<TextBarProps> = ({ uid }) => {
    const [messageSent, setMessageSent] = useState<Message>({
        id: uid,
        content: '',
        created: null
    });

    const {SendMessage} = useContext(SocketContext)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'message') {
            setMessageSent(prev => ({
                ...prev,
                content: e.target.value,
                created: new Date()
            }));
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(messageSent);


        SendMessage(messageSent);
        setMessageSent(prev => ({
            ...prev,
            content: '',
            created: new Date()
        }));

        
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="message"
                onChange={handleChange}
                value={messageSent.content}
                placeholder="Type a message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default TextBar;
