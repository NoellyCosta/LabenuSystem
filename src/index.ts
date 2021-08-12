import express from "express"
import cors from "cors"
import { AddressInfo } from "net"
import getAllStudents from "./endpoints/getAllStudents"
import getAllStudentsByGroup from "./endpoints/getAllStudentsByGroup"
import createStudent from "./endpoints/createNewStudent"
import createNewClass from "./endpoints/createNewClass"
import getStudentByIdAge from "./endpoints/getStudentByIdAge"
import createNewTeacher from "./endpoints/createNewTeacher"
import editStudent from "./endpoints/editStudent"
import editTeacher from "./endpoints/editTeacher"


const app = express()
app.use(express.json())
app.use(cors())

app.post("/estudante", createStudent)
app.post("/turma", createNewClass)
app.post("/docente", createNewTeacher)
app.get("/estudante/all", getAllStudents)
app.get("/estudante/turma/:id", getAllStudentsByGroup)
app.get("/estudante/:id", getStudentByIdAge)
app.put("/estudante", editStudent)
app.put("/docente", editTeacher)



const server = app.listen(process.env.PORT || 3003, () => {

    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost: ${address.port}`)
    } else {
        console.error(`Failure upon starting server.`)
    }
})