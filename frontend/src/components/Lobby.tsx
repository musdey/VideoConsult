import React from 'react'
import { Typography, List, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'
import ListItemButton from '@mui/material/ListItemButton'
import { User } from '../types/user'


type LobbyProps = {
    userInLobby: User[]
    clickHandler: any
}

class Lobby extends React.Component<LobbyProps> {
    render(): any {

        const { userInLobby, clickHandler } = this.props

        const listItems = userInLobby.map((user) => {
            const isActive = user.active ? 'Active' : 'Waiting'
            const time = user.active ? user.callEntered : user.lobbyEntered
            const text = isActive + ' for ' + (Date.now() - Date.parse(time!)) + ' minutes';
            const item = <ListItemButton onClick={clickHandler} >
                <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.firstName + " " + user.lastName} secondary={text} />
            </ListItemButton>
            return item
        })

        return (
            <div style={{ width: '100%', height: '100%', maxWidth: '360px' }}
            >
                <Typography variant="h5" color="textPrimary" align="center">
                    Lobby
                </Typography>

                <List>
                    {listItems}
                </List>
            </div >

        )
    }
}
export default Lobby