import {Request, Response} from "express"
import {estudante} from "../types"
import connection from "../connection"


export default async function getAllStudents(req:Request, res: Response): Promise<void>{
    try {
   
       
     
        const estudantes: estudante[] =
           await connection("estudante")
     
    
        res.send(estudantes)
     } catch (error) {
        res.status(500).send("Unexpected server error")
     
 }
}