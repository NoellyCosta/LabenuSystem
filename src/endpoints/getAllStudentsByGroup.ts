import { Request, Response } from "express"
import getClass from "../data/getClass"
import getStudentsFromGroup from "../data/getSudentesFromGroup"


export default async function getAllStudentsByGroup(
    req: Request,
    res: Response): Promise<any> {
    let errorCode = 400
    try {


        if (isNaN(Number(req.params.id))) {
            errorCode = 422
            throw new Error("Id inválido")
        }

      const result = await getStudentsFromGroup(Number(req.params.id))

      const group = await getClass(Number(req.params.id))
      if(group.length === 0) {
          errorCode = 422
          throw new Error("Turma inexistente")
      }

      if(result.length === 0) {
          errorCode = 422
          throw new Error("Não há alunos nesta turma")
      }

        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({ message: error.sqlMessage || error.message })

    }
}