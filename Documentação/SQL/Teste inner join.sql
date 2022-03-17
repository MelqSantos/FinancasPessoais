insert into tb_receita (valor, categoria_id, mes_id, usuario_id) values
(2300.00, 1, 2, 1);

select * from tb_receita
inner join tb_categoria 
on tb_receita.categoria_id = tb_categoria.id
inner join tb_usuario
on tb_receita.usuario_id = tb_usuario.id;
