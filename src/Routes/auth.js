import VerificarLogin from '../AuthComponents/VerificarLogin/VericarLogin';
const router = require('express').Router();


router.get('/login',(req, res) => {
    
    res.render('login.hbs', {layout: 'login'});
})

router.get('/logout' , (req,res) => {
    req.session.destroy()
    res.send('Sesion destruida :D')
})


router.post('/login', ( req, res ) => {
    const { user, pass} = req.body;
    VerificarLogin(user,pass)
      .then( () => {
        req.session.user = user;
        req.session.pass = pass;
        res.redirect('/')
      })
      .catch( () => res.redirect('login') );
    
    
})

module.exports = router;
