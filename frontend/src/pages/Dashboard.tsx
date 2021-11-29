import React, { useEffect } from 'react'
import Lobby from '../components/Lobby';
import { User } from './../types/user'

const data: User[] = [
    {
        username: "Musti",
        firstName: "Mustafa",
        lastName: "Cicek",
        active: true,
        lobbyEntered: "1633283123578"
    },
    {
        firstName: "Matthias",
        lastName: "Malemedie",
        active: false,
        lobbyEntered: "1633283123578"
    },
    {
        firstName: "Stefanie",
        lastName: "Steffenson",
        active: false,
        lobbyEntered: "1633283123578"
    },
]


const Dashboard: React.FunctionComponent = () => {

    const [windowPop, setWindowPop] = React.useState(false)

    const handleOnClick = () => {
        console.log(windowPop)
        setWindowPop(!windowPop)
    }

    return (

        <>
            <div>
                <Lobby userInLobby={data} clickHandler={handleOnClick}></Lobby>
            </div>
        </>
    )
}


export default Dashboard;