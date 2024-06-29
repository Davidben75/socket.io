// ChatContent.tsx
import React, { useContext } from 'react';
import SocketContext from '../contexts/Socket/Context';
import TextBar from './TextBar';

const ChatContent: React.FC = () => {
  const { socket, uid, users } = useContext(SocketContext).SocketState;


  return (
    <>
      <h2>Socket IO info</h2>
      <p>
        Your user ID: <strong>{uid || 'Not set'}</strong> <br />
        Users online: <strong>{users ? users.length : 'Unknown'}</strong> <br />
        Socket ID: <strong>{socket?.id || 'Not connected'}</strong> <br />
      </p>

      <TextBar/>
    </>
  );
};

export default ChatContent;
