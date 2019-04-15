const router = require('express').Router();


router.get('/registro',(req, res) => {
    res.render('register');
})


router.get('/',(req, res) => {
    res.render('inicio.hbs');
})

module.exports = router;