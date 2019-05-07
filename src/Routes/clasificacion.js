
const router = require('express').Router();
import CreateConnection from '../ServerComponents/CreateConnection/CreateConnection';
const connection = CreateConnection;

const categoria  = [
    {
        id: 1,
        nombre: 'Hogar'
    },
    {
        id: 2,
        nombre: 'Herramientas'
    },
    {
        id: 3,
        nombre: 'Alimentos'
    },
    {
        id: 4,
        nombre: 'Mascotas'
    }
]
const marca  = [
    {
        id: 1,
        nombre: 'Eskimo'
    },
    {
        id: 2,
        nombre: 'Samsung'
    },
    {
        id: 3,
        nombre: 'Lala'
    },
    {
        id: 4,
        nombre: 'Kola Shaler'
    }
]

const subcategoria  = [
    {
        id: 1,
        nombre: 'Lacteos',
        padre: 'Alimentos'
    },
    {
        id: 1,
        nombre: 'Carnes',
        padre: 'Alimentos'
    },
    {
        id: 1,
        nombre: 'Vegetales',
        padre: 'Alimentos'
    },
    {
        id: 1,
        nombre: 'Frutas',
        padre: 'Alimentos'
    }
]



router.get('/clasificacion', (req, res) => {
    res.render('clasificacion', {categoria, subcategoria, marca})
})

module.exports = router;
  