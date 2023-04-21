import Users from '@/Model/schema'
import connectmongodb from '@/db/db'
import {hash} from 'bcryptjs'
import { Error } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Data{
    username:string,
    email:string,
    password:string,
    role:'Admin'|'SalesMan'
}
export default async function handler(req:NextApiRequest, res:NextApiResponse){
    connectmongodb().catch(err =>(  err.json({message: 'Connecion Failed'})))
    // const db =  await connectmongodb()
    if (req.method ==='POST'){
        if (!req.body){return res.status(404).json({message:'request is empty'})}
       const{username,email,password,Role} = req.body
       const hashedPassword:string = await hash(password,14) 
       const userData = new Users({username,email, password:hashedPassword,Role})
       const CheckUserExists = await Users.findOne({email})
       if (CheckUserExists){return res.status(422).json({message:'User already exists'})}
       userData.save()
       .then((data:Data) => { return res.status(201).json({status: 'success',user:data})})
       .catch((err:any) => {return res.status(201).json({status: 'Failed',error:err}) })

    }
    else {
         res.status(500).json({message:'Only POST requests are valid for this endpoint'})
    }
} 