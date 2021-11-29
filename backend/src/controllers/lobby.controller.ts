import { Handler, NextFunction, Request, Response } from 'express'
import Lobby from '../models/Lobby'
import ILobby from '../models/Lobby'
import IShop from '../models/Shop'
import generatoRandomCode from '../service/codeGenerationService'

interface Lobby {
    shopId: string
    shopName: string
    videoCode: string
    videoURL: string
}

let lobbyArray: Lobby[] = []

const getActiveLobbies = async () =>{
    const lobbies = await ILobby.find({active:true}).exec()
    return lobbies
}

const createVideoRoom = async (shopId: string) => {
    const actualLobby = lobbyArray.find((lobby)=>{
        shopId = lobby.shopId
    })
    if(!actualLobby){
        return
    }
    if(!actualLobby.videoCode || actualLobby.videoCode !== ""){
        actualLobby.videoCode = await generatoRandomCode()
        actualLobby.videoURL = "https://localhost:8443/"+actualLobby.videoCode
    }
}

const setLobbyToActive = async (shopId: string) => {
    const shop = await IShop.findOne({_id: shopId})
    if(shop) {
        await shop.update({active:true}).exec()
        lobbyArray.push({shopId: shop._id, shopName: shop.shopName})
    }
}

const setLobbyToInactive = async (shopId: string) => {
    const shop = await IShop.findOne({_id: shopId})
    if(shop) {
        await shop.update({active:false}).exec()
        const filteredArray = lobbyArray.filter((lobby)=>{
            return lobby.shopId != shopId
        })
        lobbyArray = filteredArray
    }
}

const getLobby: Handler = async (req: Request, res: Response, next: NextFunction) => {
    const shopId =  req.params.id
    console.log("shopId is ",shopId)

    if(!shopId){
        next(new Error("Missing shopId"))
    }
    
    try {
      const lobby = await ILobby.findOne({_id: shopId})
      if(!lobby){
          next(new Error("No lobby found with provided Id"))
      }
  
      return res.status(200).send(lobby)
    } catch (err) {
      return next(err)
    }
  }

  export {
      getLobby,
      setLobbyToActive,
      setLobbyToInactive,
  }