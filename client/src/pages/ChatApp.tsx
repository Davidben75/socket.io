import React from 'react';
import '../App.css';
import SocketContextComponent from '../contexts/Socket/Component';
import ChatContent from '../components/ChatContent';


// 
const ChatApp: React.FC = () => {
  return (
    <SocketContextComponent>
      <ChatContent />
    </SocketContextComponent>
  );
};

export default ChatApp;
