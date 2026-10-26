-- Propuesta inicial H2. No ejecutada en esta revisión. Sin datos personales.
BEGIN;
CREATE TABLE analisis (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 tipo varchar(12) NOT NULL CHECK (tipo IN ('enlace','correo','mensaje','telefono')),
 resultado varchar(40) NOT NULL,
 creado_en timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE alertas (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 analisis_id bigint NOT NULL UNIQUE REFERENCES analisis(id) ON DELETE CASCADE,
 revisada boolean NOT NULL DEFAULT false
);
COMMIT;
