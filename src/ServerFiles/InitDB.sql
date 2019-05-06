use `Inventario`;

-- ELEMENTOS DEL SKU
create table if not exists Usuario(
    UUID varchar not null,
)


create table if not exists Categoria (
	ID_categoria int(3) not null ,
    nombre varchar(15) not null,
    constraint PK_cat primary key (ID_categoria)
) ENGINE = InnoDB;

create table if not exists Subcategoria (
	ID_subcategoria int(3) unsigned not null,
    nombre varchar(15) not null,
    ID_categoria int(3) not null,
    constraint PK_sub primary key (ID_subcategoria, ID_categoria),
    constraint FK_sub_cat foreign key (ID_categoria) references Categoria(ID_categoria)
) ENGINE = InnoDB;

create table if not exists Marca (
	ID_marca int(3) unsigned not null,
    nombre varchar(15) not null,
    constraint PK_mar primary key (ID_marca)
) ENGINE = InnoDB;

create table if not exists SKU (
	SKU char(12) not null,
	ID_categoria int(3),
    ID_subcategoria int(3) unsigned not null,
    ID_marca int(3) unsigned not null,
    variante int(3) unsigned not null,
    constraint PK_sku primary key (SKU),
    constraint FK_sku_cat foreign key (ID_categoria) references Categoria(ID_categoria),
    constraint FK_sku_sub foreign key (ID_subcategoria, ID_categoria) references Subcategoria(ID_subcategoria, ID_categoria),
    constraint FK_sku_mar foreign key (ID_marca) references Marca(ID_marca)
) ENGINE = InnoDB;

-- PRODUCTOS, DESCUENTOS POR PRODUCTO, PROVEEDORES

create table if not exists Producto (
	ID_producto int unsigned not null ,
    SKU char(12) not null,
    nombre varchar(30) not null,
    precio_unit numeric (15,2) not null,
    paga_imp boolean default true,
    constraint FK_pro_sku foreign key (SKU) references SKU(SKU),
    constraint PK_pro primary key (ID_producto)
) ENGINE = InnoDB;

create table if not exists DescuentoProducto (
	ID_descproducto int unsigned not null ,
    nombre varchar(30) not null,
    porcentaje numeric (4,4) unsigned not null,
    activo boolean default false,
    constraint PK_dpr primary key (ID_descproducto),
    check (porcentaje < 1)
) ENGINE = InnoDB;

create table if not exists Proveedor (
	ID_proveedor int unsigned not null ,
    nombre varchar(30) not null,
    constraint PK_prv primary key (ID_proveedor)
) ENGINE = InnoDB;

create table if not exists Producto_DescuentoProducto (
    ID_prodesc int unsigned not null ,
	ID_producto int unsigned not null,
	ID_descproducto int unsigned not null,
	constraint PK_pro_dpr primary key (ID_prodesc),
    constraint FK_prodpr_pro foreign key (ID_producto) references Producto(ID_producto),
    constraint FK_prodpr_dpr foreign key (ID_descproducto) references DescuentoProducto(ID_descproducto)
) ENGINE = InnoDB;

create table if not exists Producto_Proveedor(
    ID_proprov int unsigned not null ,
	ID_producto int unsigned not null,
	ID_proveedor int unsigned not null,
	constraint PK_pro_dpr primary key (ID_proprov),
    constraint FK_proprv_pro foreign key (ID_producto) references Producto(ID_producto),
    constraint FK_proprv_prv foreign key (ID_proveedor) references Proveedor(ID_proveedor)
) ENGINE = InnoDB;

-- LOTES, ALMACEN, CADUCIDAD

create table if not exists Almacen (
	ID_almacen int unsigned not null ,
    nombre varchar(30) not null,
    constraint PK_alm primary key (ID_almacen)
) ENGINE = InnoDB;

create table if not exists Lotes (
	ID_lotes int unsigned not null ,
    ID_producto int unsigned not null,
    cantidad numeric (10,2) not null,
    fecha_ingreso date not null,
    ID_almacen int unsigned,
    constraint FK_lot_pro foreign key (ID_producto) references Producto(ID_producto),
    constraint FK_lot_alm foreign key (ID_almacen) references Almacen(ID_almacen),
    constraint PK_lot primary key (ID_lotes)
) ENGINE = InnoDB;

create table if not exists CaducidadLotes (
	ID_lotes int unsigned not null,
    fecha_caducidad date not null,
    constraint FK_cad_lot foreign key (ID_lotes) references Lotes(ID_lotes),
    constraint PK_cad_lot primary key (ID_lotes)
) ENGINE = InnoDB;

-- VENTAS, CLIENTES, DESCUENTO GENERAL

create table if not exists Cliente (
    ID_cliente int unsigned not null ,
	nombre varchar(50) not null,
    telefono int(12),
    direccion varchar(100) not null,
    constraint PK_cli primary key (ID_cliente)
) ENGINE = InnoDB;

create table if not exists Venta (
	ID_venta int unsigned not null ,
    ID_cliente int unsigned not null,
    monto_neto numeric (15,2) not null,
    monto_total numeric (15,2) not null,
    fecha date not null,
    constraint FK_ven_cli foreign key (ID_cliente) references Cliente(ID_cliente),
    constraint PK_ven primary key (ID_venta)
) ENGINE = InnoDB;

create table if not exists VentasImpuestos (
	ID_venta int unsigned not null,
    monto_impuesto numeric (15,2) not null,
    constraint PK_vim primary key (ID_venta),
    constraint FK_ven_vim foreign key (ID_venta) references Venta(ID_venta)
) ENGINE = InnoDB;

create table if not exists VentasDescuento (
	ID_venta int unsigned not null,
    monto_producto numeric (15,2) not null,
    monto_general numeric (15,2) not null,
    constraint PK_vde primary key (ID_venta),
    constraint FK_ven_vde foreign key (ID_venta) references Venta(ID_venta)
) ENGINE = InnoDB;

create table if not exists DescuentoGeneral (
	ID_descgeneral int unsigned not null ,
    nombre varchar(30) not null,
    porcentaje numeric (4,4) unsigned not null,
    activo boolean default false,
    constraint PK_dge primary key (ID_descgeneral),
    check (porcentaje < 1)
) ENGINE = InnoDB;

create table if not exists Venta_DescuentoGeneral (
    ID_vendesc int unsigned not null ,
	ID_descgeneral int unsigned not null,
    ID_venta int unsigned not null,
    constraint PK_ven_dge primary key (ID_vendesc),
    constraint FK_vendge_dge foreign key (ID_descgeneral) references DescuentoGeneral(ID_descgeneral),
    constraint FK_vendge_ven foreign key (ID_venta) references Venta(ID_venta)
) ENGINE = InnoDB;

create table if not exists Venta_Lotes (
    ID_venlote int unsigned not null ,
	ID_lotes int unsigned not null,
    ID_venta int unsigned not null,
    constraint PK_ven_lot primary key (ID_venlote),
    constraint FK_venlot_lot foreign key (ID_lotes) references Lotes(ID_lotes),
    constraint FK_venlot_ven foreign key (ID_venta) references Venta(ID_venta)
) ENGINE = InnoDB;

-- COMPRAS

create table if not exists Compra (
	ID_compra int unsigned not null ,
    ID_proveedor int unsigned not null,
    monto_neto numeric (15,2) not null,
    monto_total numeric (15,2) not null,
    fecha date not null,
    constraint FK_com_pro foreign key (ID_proveedor) references Proveedor(ID_proveedor),
    constraint PK_com primary key (ID_compra)
) ENGINE = InnoDB;

create table if not exists ComprasImpuestos (
	ID_compra int unsigned not null,
    monto_impuesto numeric (15,2) not null,
    constraint PK_cim primary key (ID_compra),
    constraint FK_com_cim foreign key (ID_compra) references Compra(ID_compra)
) ENGINE = InnoDB;

create table if not exists ComprasDescuento (
	ID_compra int unsigned not null,
    monto_producto numeric (15,2) not null,
    monto_general numeric (15,2) not null,
    constraint PK_cde primary key (ID_compra),
    constraint FK_com_cde foreign key (ID_compra) references Compra(ID_compra)
) ENGINE = InnoDB;


create table if not exists Compra_Lotes (
    ID_comlote int unsigned not null ,
	ID_lotes int unsigned not null,
    ID_compra int unsigned not null,
    constraint PK_com_lot primary key (ID_comlote),
    constraint FK_comlot_lot foreign key (ID_lotes) references Lotes(ID_lotes),
    constraint FK_comlot_com foreign key (ID_compra) references Compra(ID_compra)
) ENGINE = InnoDB;

SET SQL_SAFE_UPDATES = 0;
