import { Document, Schema, Model, model } from 'mongoose'
import { IUser } from './User'

export interface IShop extends Document {
  // _id let it autogenerate by mongodb
  shopName: string
  email: string
  phoneNumber: string
  address: {
    city: string
    postalCode: number
    street: string
    streetNumber: string
    streetExtra: string
  }
  emailIsVerified: boolean
  owner: IUser,
  employees: [IUser]
}

const ShopSchema = new Schema(
  {
    // _id let it autogenerate by mongodb
    shopName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    emailIsVerified: {
      type: Boolean,
      default: false
    },
    phoneNumber: {
      type: String
    },
    address: {
      city: {
        type: String
      },
      postalCode: {
        type: Number
      },
      street: {
        type: String
      },
      streetNumber: {
        type: String
      },
      streetExtra: {
        type: String
      }
    },
    owner:
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    employees:
  [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  { strict: false, versionKey: false }
)

const Shop: Model<IShop> = model('Shop', ShopSchema)
export default Shop