// ChatContent.tsx
import React, { useContext } from 'react';
import SocketContext from '../contexts/Socket/Context';
import TextBar from './TextBar';

const ChatContent: React.FC = () => {
  const {  uid } = useContext(SocketContext).SocketState;


  return (
    <>
      {/* <h2>Socket IO info</h2>
      <p>
        Your user ID: <strong>{users || 'Not set'}</strong> <br />
        Users online: <strong>{users ? users.length : 'Unknown'}</strong> <br />
        Socket ID: <strong>{socket?.id || 'Not connected'}</strong> <br />
      </p> */}



      <TextBar uid={uid}/>
    </>
  );
};

export default ChatContent;
