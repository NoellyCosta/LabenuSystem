import { Request, Response } from "express"
import putTeacher from "../data/putTeacher"
import getClass from "../data/getClass"
import getTeacher from "../data/getTeacher"

export default async function (
    req: Request,
    res: Response
): Promise<any> {
    let errorCode = 400
    try {

        if (!req.body.docente_id || !req.body.turma_id) {
            errorCode = 422
            throw new Error("Preencha os campos corretamente e tente novamente")
        }

        if(isNaN(Number(req.body.turma_id)) || isNaN(Number(req.body.docente_id))) {
            errorCode = 422
            throw new Error("Id inválido")
        }

      const teacher = await getTeacher(Number(req.body.docente_id))
      if(teacher.length === 0) {
          errorCode = 422
          throw new Error("Docente inexistente")
      }

      const group = await getClass(Number(req.body.turma_id))
      if(group.length === 0) {
          errorCode = 422
          throw new Error("Turma inexistente")
      }

      await putTeacher(Number(req.body.docente_id), Number(req.body.turma_id))

      res.status(200).send(`Professor cadastrado na turma ${req.body.turma_id} com sucesso!`)
    } catch (error) {
        res.status(400).send({ message: error.sqlMessage || error.message })
    }
}