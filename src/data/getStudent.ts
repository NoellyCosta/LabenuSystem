import connection from "../connection"


export default async function getStudent(
    id: number
):Promise<any> {
    const result = await connection.raw(`
    SELECT * FROM estudante
    WHERE id = ${id}
    `);

    return result[0]
}