const router = require('express').Router();


router.get('/login',(req, res) => {
    console.log(req.user)
    res.render('inicio.hbs');
})




module.exports = router;