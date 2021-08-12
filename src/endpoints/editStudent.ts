import {Request, Response} from "express"
import putStudent from "../data/putStudent"
import getClass from "../data/getClass"
import getStudent from "../data/getStudent"
import connection from "../connection"

export default async function editStudent (
    req:Request,
    res:Response
):Promise<any> {

let errorCode = 400
try {
    if(!req.body.estudante_id || !req.body.turma_id){
        errorCode = 422
        throw new Error("Preencha todos os campos corretamente e tente novamente")
    }

    if(isNaN(Number(req.body.turma_id)) || isNaN(Number(req.body.estudante_id))) {
        errorCode = 422
        throw new Error("Este estudante não existe")
    } 

    const student = await getStudent(Number(req.body.estudante_id))

    const group = await getClass(Number(req.body.turma_id))
    if(group.length === 0) {
        errorCode = 422
        throw new Error("Turma inexistente")
    }

    await putStudent(Number(req.body.estudante_id), Number(req.body.turma_id))

    res.status(200).send("Estudante atualizado com sucesso!")
} catch (error) {
    res.status(errorCode).send({message: error.sqlMessage || error.message})
}


}
