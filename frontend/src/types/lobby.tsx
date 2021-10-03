import { User } from './user'
export interface ILobby {
    name: string
    id: string
    videoCode: string
    videoURL: string
    currentCustomer: User
    pendingCustomer: [User]
}
