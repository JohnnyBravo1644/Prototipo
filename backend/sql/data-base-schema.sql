-- Cria a tabela "professores"
CREATE TABLE professores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    formacao VARCHAR(100) NOT NULL,
    CONSTRAINT professores_unique_key UNIQUE (id, email)
);

CREATE TABLE disciplinas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    professor_id INT,
    dia_semana VARCHAR(20),
    periodo VARCHAR(20) NOT NULL,
    sala_id INT,
    alunos_quantidade INT,
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

-- Inserir conteúdo na tabela de professores

INSERT INTO professores (nome, email, formacao)
VALUES ('Ismael Mazzuco', 'ismaelmz@gmail.com', 'Mestrado em Tecnologias da Informação e Comunicação');

INSERT INTO professores (nome, email, formacao)
VALUES ('Welquer Esser', 'welquerka@gmail.com', 'Pós Graduação em Sistemas de Informação');

INSERT INTO professores (nome, email, formacao)
VALUES ('Ricardo Alexandre Vargas Barbosa', 'rbfigura@gmail.com', 'Mestrado em Engenharia de Softwere');

-- Inserir conteúdo na tabela de disciplinas

INSERT INTO disciplinas (nome, professor_id, periodo, sala_id, alunos_quantidade)
VALUES ('Desenvolvimento Web', 2, 'Noturno', 1, 15);

INSERT INTO disciplinas (nome, professor_id, periodo, sala_id, alunos_quantidade)
VALUES ('Auditoria e Seguranca', 3, 'Noturno', 2, 15);

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
VALUES ('Direito');
