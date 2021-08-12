import connection from "../connection"

export default async function  putTeacher(
    id: number,
    turma_id: number | string
):Promise<void> {
    await connection.raw(`
    UPDATE docente
    SET  turma_id = ${turma_id}
    WHERE id = ${id}
    `);
}