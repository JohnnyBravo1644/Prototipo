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
    professor_email VARCHAR(100),
    dia_semana VARCHAR(20),
    periodo VARCHAR(20) NOT NULL,
    FOREIGN KEY (professor_id, professor_email) REFERENCES professores (id, email)
);

-- Inserir conteúdo na tabela de professores

INSERT INTO professores (nome, email, formacao)
VALUES ('Ismael Mazzuco', 'ismaelmz@gmail.com', 'Mestrado em Tecnologias da Informação e Comunicação');

INSERT INTO professores (nome, email, formacao)
VALUES ('Welquer Esser', 'welquerka@gmail.com', 'Pós Graduação em Sistemas de Informação');

INSERT INTO professores (nome, email, formacao)
VALUES ('Ricardo Alexandre Vargas Barbosa', 'rbfigura@gmail.com', 'Mestrado em Engenharia de Softwere');

-- Inserir conteúdo na tabela de disciplinas

INSERT INTO disciplinas (nome, professor_id, professor_email, periodo)
VALUES ('Desenvolvimento Web', 2, 'welquerka@gmail.com', 'Noturno');

INSERT INTO disciplinas (nome, professor_id, professor_email, periodo)
VALUES ('Auditoria e Seguranca', 3, 'rbfigura@gmail.com', 'Noturno');
