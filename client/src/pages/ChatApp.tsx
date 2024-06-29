import { useContext } from 'react'
import '../App.css'
import SocketContext from '../contexts/Socket/Context.ts'
import SocketContextComponent from '../contexts/Socket/Component.tsx'

export interface IAppProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const  ChatApp = ()=> {

  const {socket, uid, users} = useContext(SocketContext).SocketState
  return (
     <SocketContextComponent>
      <h2>Scoket IO info</h2>
      <p>
        Your user ID : <strong> {uid}</strong> <br />
        Users online : <strong> {users.length}</strong> <br />
        Socket ID : <strong> {socket?.id} </strong> <br />
      </p>
    </SocketContextComponent> 
  )
}

export default ChatApp
