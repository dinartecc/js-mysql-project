insert into almacen ( ID_almacen, nombre ) values ( 0,'Borrado');
insert into categoria ( ID_categoria, nombre ) values ( 0, 'Borrado');
insert into subcategoria ( ID_subcategoria, nombre, ID_categoria ) values (0, 'Borrado', 0);
insert into cliente ( ID_cliente, nombre, telefono, direccion ) values ( 0, 'Borrado', '0', 'Borrado');
insert into marca ( ID_marca, nombre ) values ( 0, 'Borrado');
insert into sku ( SKU, ID_categoria, ID_subcategoria, ID_marca, variante ) values ('000000000000', 0, 0, 0, 0);
insert into producto ( ID_producto, SKU, nombre, precio_unit, paga_imp ) values ( 0, '000000000000', 'Borrado', 0, false);
insert into lotes ( ID_lotes, ID_producto, cantidad, fecha_ingreso, ID_almacen) values ( 0, 0, 0, '1970-01-01', 0) ;
insert into caducidadlotes ( ID_lotes, fecha_caducidad ) values ( 0, '1970-01-01' );
insert into proveedor ( ID_proveedor, nombre ) values ( 0, 'Borrado' );
insert into compra ( ID_compra, ID_proveedor, monto_neto, monto_total, fecha ) values ( 0, 0, 0, 0, '1970-01-01' );
insert into compra_lotes ( ID_comlote, ID_lotes, ID_compra ) values ( 0, 0, 0 );
insert into comprasdescuento ( ID_compra, monto_producto, monto_general ) values ( 0, 0, 0 ); 
insert into comprasimpuestos ( ID_compra, monto_impuesto ) values ( 0, 0 );
insert into descuentogeneral ( ID_descgeneral, nombre, porcentaje, activo ) values ( 0, 0, 0, 0 );
insert into descuentoproducto ( ID_descproducto, nombre, porcentaje, activo ) values ( 0, 'Borrado', 0, false );
insert into producto_descuentoproducto ( ID_prodesc, ID_producto, ID_descproducto) values (0, 0, 0 );
insert into producto_proveedor (ID_proprov, ID_producto, ID_proveedor) values ( 0, 0, 0 );
insert into venta (ID_venta, ID_cliente, monto_neto, monto_total, fecha) values ( 0, 0, 0, 0, '1970-01-01');
insert into venta_descuentogeneral (ID_vendesc, ID_descgeneral, ID_venta) values ( 0, 0, 0 );
insert into venta_lotes ( ID_venlote, ID_lotes, ID_venta) values ( 0, 0, 0 );
insert into ventasdescuento ( ID_venta, monto_producto, monto_general ) values ( 0, 0, 0);
insert into ventasimpuestos ( ID_venta, monto_impuesto ) values ( 0, 0 );

insert into roles (productos, clasificacion, lotes, usuarios, reportes, administrador, rol, ID_rol) values (5 ,5 ,5 ,5 , 5, 2, 'Administrador', 1);
insert into usuarios (user, pass, name, ID_rol, ID_usuario) values ('admin' ,'admin', 'Administrador', 1, 1);



