import connection from "../connection"

export default async function getTeacher(
    id: number,
):Promise<any>{
    const result = await connection.raw(`
    SELECT * FROM docente
    WHERE id = ${id}
    `);

    return result[0]
}