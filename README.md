# LabenuSystem
Criação de sistema que representa a organização e co-relação entre professores, turmas e alunos da Labenu

## Exercícios para tarde:

Você estuda na Labenu_ há tanto tempo que já parecem anos, não é? Então, hoje, vamos pedir para criar um sistema que represente o básico da nossa organização. 

Ele deve possuir, ao menos, as 3 entidades importantes:

1. Estudante

    Representa estudantes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e os principais hobbies dele. Cada estudante pode estar em uma e somente uma turma por vez.

2. Docente

    Representa docentes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e todas as especialidades dele. Há 7 especialidades: React, Redux, CSS, Testes, Typescript, Programação Orientada a Objetos e Backend. Cada professor só pode ser alocado em uma e somente uma turma por vez.

3. Turma

    Toda turma é composta das seguintes características: id, nome, data de início, data de término, lista de professores responsáveis, uma lista de alunos e módulo atual em que a turma está.

    O módulo pode assumir os valores de 1 a 7 ou `0`, indicando que as aulas dessa turma ainda não começaram.

    Para esse exercício, vamos considerar que existam dois tipos de turma: integral ou noturna. Há uma restrição para o nome das turmas noturnas: tem que terminar com `-na-night`.

As funcionalidades básicas são:

→ Criar estudante;

→ Criar docente;

→ Criar turma;

→ Adicionar estudante na turma;

→ Adicionar docente na turma;

→ Pegar a idade de algum estudante a partir do id

**Instruções:**

1. Você deve criar uma pasta `src` e colocar todas as implementações nela. 
2. Para a entrega deve haver, no seu banco, duas turmas, dois alunos e dois professores. Adicione as pessoas às turmas da forma como achar mais pertinente
3. Você deve salvar as informações das turmas em tabelas `class`, estudantes em `student` e docentes em `teacher`. 
4. No sistema todo, deve haver, ao menos, **1 tabela de interseção**
5. O mais importante: **seja criativo no seu projeto! 😄**
- **Uso de banco de dados**

    Como este é um projeto em grupo, mas que envolve utilização de banco de dados, que é algo que possui informação potencialmente sensível, duas abordagens são as mais comuns:

    1. **Espelhar o banco para cada um dos usuários**
    Neste cenário, todos criam as mesmas tabelas em seus respectivos bancos, e vão testando o código de forma a manter a estrutura dos dados.
    2. **Utilização de um banco do grupo**
    Neste cenário, uma das pessoas que integra o grupo cede sua senha para o resto, e ao final do projeto abre um **atendimento no raiozinho ⚡→ Questões técnicas**, pedindo para que sua senha seja redefinida.

- **SUGESTÕES de modelagem**

    As tabelas de `STUDENT` e `TEACHER` serão muito parecidas, com ambas possuindo

    - ID
    - Nome
    - E-mail
    - Data de nascimento

    O que muda é que cada uma tem sua coluna particular. Estudantes possuem hobbies, que são livres em descrição, e docentes possuem especialidades, que são valores pré-definidos.

    A tabela de `CLASS` pode receber valores pré-definidos de módulo, além dos já conhecidos:

    - ID
    - Nome
    - Data de início
    - Data de encerramento

    Pensando nas relações possíveis entre: Estudantes e hobbies, Docentes e especialidades, e também entre discentes, docentes e turmas, a modelagem abaixo pode ajudar:

    

- **Desafios**

    → Exibir estudantes de uma turma;

    → Exibir docentes de uma turma;

    → Exibir estudantes que possuam o mesmo hobby;

    → Remover estudante de uma turma;

    → Remover estudante;

    → Remover docente de uma turma;

    → Mudar turma de módulo
