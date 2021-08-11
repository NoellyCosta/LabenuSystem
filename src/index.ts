import express, { Request, Response } from "express"
import cors from "cors"
import knex from "knex"
import dotenv from "dotenv"
import { AddressInfo } from "net"
import { criaTurmaInput, TIPO_TURMA, criaEstudanteInput, ESPECIALIDADE, criaDocenteInput, atualizaEstudanteInput, atualizaDocenteInput } from "./types"
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

app.put("/estudante", async (req: Request, res: Response) => {
    let errorCode = 400
    try {

        const input: atualizaEstudanteInput = {
            estudante_id: req.body.estudante_id,
            turma_id: req.body.turma_id

        }

        await connection.raw(`
        UPDATE estudante
        SET turma_id = ${input.turma_id}
        WHERE id = ${input.estudante_id}
        `);


        res.status(200).send("Dados do estudante atualizado com sucesso!")
    } catch (error) {
       
        if(error.message.includes("Foreign key constraint fails")){
            errorCode = 422
           
        }
        res.status(errorCode).send({ message: "Turma inexistente" })
    }

})

app.get("/estudante/:id", async (req: Request, res: Response) => {
    let errorCode = 400
    try {

        const id = req.params.id

        if(isNaN(Number(id))){
            errorCode = 422
            throw new Error("Apenas valores númercos")
        }


        const result = await connection.raw(`
        SELECT ROUND(DATEDIFF("2021-01-01", data_nasc)/365) as idade
        FROM estudante
        WHERE id = ${id}
        `);

        if(result[0].length === 0){
            errorCode = 404
            throw new Error("Estudante não encontrado")
        }


        res.status(200).send({estudante: result[0][0]})
    } catch (error) {
        res.status(errorCode).send({ message: error.sqlMessage || error.message })
    }
})


app.post("/docente", async (req: Request, res: Response) => {

    let errorCode = 400
    try {

        const input: criaDocenteInput = {
            id: req.body.id,
            nome: req.body.nome,
            email: req.body.email,
            data_nasc: req.body.data_nasc,
            especialidades: req.body.especialidades,
            turma_id: req.body.turma_id
        }

        if (!input.id || !input.nome || !input.email || !input.data_nasc || input.especialidades.length < 1) {
            errorCode = 422
            throw new Error("Preencha os campos corretamente")
        }

        await connection.raw(`
        INSERT INTO docente(id, nome, email,  data_nasc, turma_id )
        VALUES(
    
        ${input.id},
        "${input.nome}",
        "${input.email}",
        "${input.data_nasc}",
        ${input.turma_id}
    
        );
    `)

        for (let especialidade of input.especialidades) {


            await connection.raw(`
       INSERT INTO  docente_especialidade(docente_id, especialidade_id)
       VALUES(
        ${input.id},
        ${ESPECIALIDADE[especialidade]}
       )
       `)

        }

        res.status(201).send({ message: "Docente criado com sucesso!" })
    } catch (error) {
        res.status(errorCode).send({ message: error.sqlMessage || error.message })
    }
})

app.put("/docente", async (req: Request, res: Response) => {
    let errorCode = 400
    try {

        const input: atualizaDocenteInput = {
            docente_id: req.body.docente_id,
            turma_id: req.body.turma_id

        }

        await connection.raw(`
        UPDATE docente
        SET turma_id = ${input.turma_id}
        WHERE id = ${input.docente_id}
        `);


        res.status(200).send("Dados do docente atualizado com sucesso!")
    } catch (error) {

        if(error.message.includes("Foreign key constraint fails")){
            errorCode = 422
           
        }
        res.status(errorCode).send({ message: "Turma inexistente" })
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