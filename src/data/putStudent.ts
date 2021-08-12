import connection from "../connection"


export default async function editStudent(
    id: number,
    turma_id: number | string
): Promise<void> {
    await connection.raw(`
UPDATE estudante
SET turma_id = ${turma_id}
WHERE id = ${id}
`);
}