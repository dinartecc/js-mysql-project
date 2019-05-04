use 'Inventario';


drop table if exists almacen;
drop table if exists caducidadlotes;
drop table if exists categoria;
drop table if exists cliente;
drop table if exists compra;
drop table if exists compra_lotes;
drop table if exists comprasdescuento;
drop table if exists comprasimpuestos;
drop table if exists descuentogeneral;
drop table if exists descuentoproducto;
drop table if exists lotes;
drop table if exists marca;
drop table if exists producto;
drop table if exists producto_descuentoproducto;
drop table if exists producto_proveedor;
drop table if exists proveedor;
drop table if exists sku;
drop table if exists subcategoria;
drop table if exists venta;
drop table if exists venta_descuentogeneral;
drop table if exists venta_lotes;
drop table if exists ventasdescuento;
drop table if exists ventasimpuestos;

SET FOREIGN_KEY_CHECKS = 1;
