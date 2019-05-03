
const router = require('express').Router();
import  CreateConnection from '../ServerComponents/CreateConnection/CreateConnection';

const connection = CreateConnection;




router.get('/categorias', (req, res) => {
    res.render('categorias')
})

module.exports = router;
  