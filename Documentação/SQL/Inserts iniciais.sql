use db_financas;

-- Insert na tabela Mês
insert into tb_mes (descricao) values
('Janeiro'),
('Fevereiro'),
('Março'),
('Abril'),
('Maio'),
('Junho'),
('Julho'),
('Agosto'),
('Setembro'),
('Outubro'),
('Novembro'),
('Dezembro');

-- Insert na tabela Categoria
insert into tb_categoria (descricao, tipo) values
('Salario', 'Receita'),
('Plano de celular', 'Despesa'),
('Cabelo', 'Despesa'),
('MEI', 'Despesa');

-- Insert na tabela Usuario
insert into tb_usuario (email, foto, nome, senha) values
('melqsantos96@gmail.com', 'https://i.imgur.com/6AUT8G0.jpg', 'Melqui Santos', '99598496');