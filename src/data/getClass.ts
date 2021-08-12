import connection from "../connection"

export default async function getClass(id: number): Promise<any> {
    const result = await connection.raw(`
    SELECT * FROM turma
    WHERE id = ${id}
    `);

    return result[0]
}