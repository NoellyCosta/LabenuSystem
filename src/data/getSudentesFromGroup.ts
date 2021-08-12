import connection from "../connection"


export default async function getStudentsFromGroup(id: number): Promise<any> {


    const result = await connection.raw(`
    SELECT nome, email FROM estudante
    WHERE turma_id = ${id}
    `);

    return result[0]
}