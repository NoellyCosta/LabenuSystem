import express, { Request, Response } from "express"
import cors from "cors"
import knex from "knex"
import dotenv from "dotenv"
import { AddressInfo } from "net"
import { criaTurmaInput, TIPO_TURMA, criaEstudanteInput } from "./types"
import { error } from "node:console"

dotenv.config()

export const connection = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA,
        port: 3306,
        multiStatements: true
    }
});

const app = express()
app.use(express.json())
app.use(cors())

app.post("/turma", async (req: Request, res: Response) => {
    let errorCode = 400
    try {

        const input: criaTurmaInput = {
            id: req.body.id,
            nome: req.body.nome,
            data_inicio: req.body.data_inicio,
            data_fim: req.body.data_fim,
            modulo: 0,
            tipo: req.body.tipo
        }


        if (!input.id || !input.nome || !input.data_inicio || !input.data_fim || !input.tipo) {
            errorCode = 422
            throw new Error("Preenha os campos corretamente")
        }

        if (input.tipo !== TIPO_TURMA.INTEGRAL && input.tipo !== TIPO_TURMA.NOTURNO) {
            errorCode = 422
            throw new Error("Os valores possíveis são 'integral' ou 'noturno'")
        }

        if (input.tipo === TIPO_TURMA.NOTURNO) {
            input.nome = input.nome += "-na-night"
        }

        await connection.raw(`
INSERT INTO turma(id, nome, data_inicio, data_fim, modulo)
VALUES(
    ${input.id},
    "${input.nome}",
    "${input.data_inicio}",
    "${input.data_fim}",
    ${input.modulo}
);

`);

        res.status(201).send({ message: "Turma crida com sucesso!" })
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
})

app.post("/estudante", async (req: Request, res: Response) => {

    let errorCode = 400
    try {

        const input: criaEstudanteInput = {
            id: req.body.id,
            nome: req.body.nome,
            email: req.body.email,
            data_nasc: req.body.data_nasc,
            hobbies: req.body.hobbies,
            turma_id: req.body.turma_id
        }

        if (!input.id || !input.nome || !input.email || !input.data_nasc || input.hobbies.length < 1) {
            errorCode = 422
            throw new Error("Preencha os campos corretamente")
        }

        await connection.raw(`
        INSERT INTO estudante(id, nome, email,  data_nasc, turma_id )
        VALUES(
    
        ${input.id},
        "${input.nome}",
        "${input.email}",
        "${input.data_nasc}",
        ${input.turma_id}
    
        );
    `)

        for (let hobby of input.hobbies) {

            const idPassatempo = Math.floor(Math.random() * 1000000)

            await connection.raw(`
            INSERT INTO passatempo(id, nome)
            VALUES(
             ${idPassatempo},
             "${hobby}"
            );
     `)

            await connection.raw(`
       INSERT INTO  estudante_passatempo(estudante_id, passatempo_id)
       VALUES(
        ${input.id},
        ${idPassatempo}
       )
       `)

        }

        res.status(201).send({ message: "Estudante criado com sucesso!" })
    } catch (error) {
        res.status(errorCode).send({ message: error.sqlMessage || error.message })
    }
})

const server = app.listen(process.env.PORT || 3003, () => {

    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost: ${address.port}`)
    } else {
        console.error(`Failure upon starting server.`)
    }
})