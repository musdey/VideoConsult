import { Document, Schema, Model, model } from 'mongoose'
import { IUser } from './User'

interface ILobby extends Document {
  // _id let it autogenerate by mongodb
    name: string
    videoCode: string
    videoURL: string
    currentCustomer: IUser
    pendingCustomer: [IUser]
    begin: string
    end: string
}

const LobbySchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    name: {
      type: String
    },
    videoCode: {
        type: String
    },
    videoUrl: {
        type: String,
    },
    currentCustomer:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pendingCustomer:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    begin:{
        type: String
    },
    end: {
        type: String
    }
  },
  { strict: false, versionKey: false }
)

const Lobby: Model<ILobby> = model('Lobby', LobbySchema)
export default Lobby
