import { useContext } from 'react'
import './App.css'
import SocketContext from './contexts/Socket/Context'

export interface IAppProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const  App : React.FunctionComponent<IAppProps> = (props) => {

  const {socket, uid, users} = useContext(SocketContext).SocketState
  return (
    <>
      <h2>Scoket IO info</h2>
      <p>
        Your user ID : <strong> {uid}</strong> <br />
        Users online : <strong> {users.length}</strong> <br />
        Socket ID : <strong> {socket?.id} </strong> <br />
      </p>
    </>
  )
}

export default App
