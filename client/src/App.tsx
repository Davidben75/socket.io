import { useContext } from 'react'
import './App.css'
import SocketContext from './contexts/Socket/Context'

function App() {

  const {socket, uuid, users} = useContext(SocketContext).SocketState
  return (
    <>
      <h2>Scoket IO info</h2>
      <p>
        Your user ID : <strong> {uuid}</strong> <br />
        Users online : <strong> {users.length}</strong> <br />
        Socket ID : <strong> {socket?.id} </strong> <br />
      </p>
    </>
  )
}

export default App
