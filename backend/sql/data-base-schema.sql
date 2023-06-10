-- Cria a tabela "professores"
CREATE TABLE professores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    formacao VARCHAR(100) NOT NULL,
    CONSTRAINT professores_unique_key UNIQUE (id, email)
);

CREATE TABLE horarios (
    id SERIAL PRIMARY KEY,
    disciplina_id INT,
    professor_id INT,
    dia_semana VARCHAR(20),
    periodo VARCHAR(20) NOT NULL,
    sala_id INT,
    alunos_quantidade INT,
    FOREIGN KEY (disciplina_id) REFERENCES disciplina (id),
    FOREIGN KEY (professor_id) REFERENCES professores (id),
    FOREIGN KEY (sala_id) REFERENCES salas (id)
);

CREATE TABLE salas (
    id SERIAL PRIMARY KEY,
    numero_sala VARCHAR(100) NOT NULL,
    bloco_sala VARCHAR(100) NOT NULL,
    capacidade_sala INT
);

CREATE TABLE graduacao (
    id SERIAL PRIMARY KEY,
    nome_graduacao VARCHAR(100) NOT NULL
);

CREATE TABLE disciplinas (
    id SERIAL PRIMARY KEY,
    graduacao_id INT,
    nome_disciplina VARCHAR(100) NOT NULL,
    mix BOOLEAN,
    quantidade_creditos INT,
    FOREIGN KEY (graduacao_id) REFERENCES graduacao (id)
);

-- Inserir conteúdo na tabela de professores

INSERT INTO professores (nome, email, formacao)
VALUES ('Ismael Mazzuco', 'ismaelmz@gmail.com', 'Mestrado em Tecnologias da Informação e Comunicação');

INSERT INTO professores (nome, email, formacao)
VALUES ('Welquer Esser', 'welquerka@gmail.com', 'Pós Graduação em Sistemas de Informação');

INSERT INTO professores (nome, email, formacao)
VALUES ('Ricardo Alexandre Vargas Barbosa', 'rbfigura@gmail.com', 'Mestrado em Engenharia de Softwere');

-- Inserir conteúdo na tabela de salas

INSERT INTO salas (numero_sala, bloco_sala, capacidade_sala)
VALUES ('1', 'A', 30);

INSERT INTO salas (numero_sala, bloco_sala, capacidade_sala)
VALUES ('2', 'A', 30);

INSERT INTO salas (numero_sala, bloco_sala, capacidade_sala)
VALUES ('3', 'A', 45);

INSERT INTO salas (numero_sala, bloco_sala, capacidade_sala)
VALUES ('4', 'A', 45);

INSERT INTO salas (numero_sala, bloco_sala, capacidade_sala)
VALUES ('5', 'A', 20);

INSERT INTO salas (numero_sala, bloco_sala, capacidade_sala)
VALUES ('6', 'A', 20);

-- Inserir conteúdo na tabela de salas

INSERT INTO graduacao (nome_graduacao)
VALUES ('Sistemas de Informação');

INSERT INTO graduacao (nome_graduacao)
VALUES ('Engenharia de Pesca');

-- Inserir conteúdo na tabela de disciplina

INSERT INTO disciplinas (graduacao_id, nome_disciplina, mix)
VALUES (1, 'Desenvolvimento Web', false);

INSERT INTO disciplinas (graduacao_id, nome_disciplina, mix)
VALUES (1, 'Desenvolvimento de Prototipo', false);

INSERT INTO disciplinas (graduacao_id, nome_disciplina, mix)
VALUES (1, 'Gestão de Projetos', false);

INSERT INTO disciplinas (graduacao_id, nome_disciplina, mix)
VALUES (1, 'Redes de Computadores', false);

INSERT INTO disciplinas (graduacao_id, nome_disciplina, mix)
VALUES (1, 'Redes de Computadores II', false);

INSERT INTO disciplinas (graduacao_id, nome_disciplina, mix)
VALUES (1, 'Auditoria e Segurança', false);

INSERT INTO disciplinas (graduacao_id, nome_disciplina, mix)
VALUES (1, 'Computador e Sociedade', false);

-- Inserir conteúdo na tabela de horarios

INSERT INTO horarios (disciplina_id, professor_id, periodo, sala_id, alunos_quantidade)
VALUES ('1', 2, 'Noturno', 1, 15);

INSERT INTO horarios (disciplina_id, professor_id, periodo, sala_id, alunos_quantidade)
VALUES ('6', 3, 'Noturno', 2, 15);