export enum TIPO_TURMA {
    INTEGRAL = "integral",
    NOTURNO = "noturno"
}

export type criaTurmaInput = {
    id: number,
    nome: string,
    data_inicio: string,
    data_fim: string,
    modulo: number,
    tipo: TIPO_TURMA
}

export type criaEstudanteInput = {
    id: number,
    nome: string,
    email: string,
    data_nasc: string,
    hobbies: string[],
    turma_id: number
}