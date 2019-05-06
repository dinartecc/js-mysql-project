const router = require('express').Router();
// Info temporal para loggearse 
const _user = 'root'; 
const _pass = 'admin';


router.get('/login',(req, res) => {
    console.log(req.session.id)
    
    res.render('login.hbs', {layout: 'login'});
})

router.get('/logout' , (req,res) => {
    req.session.destroy()
    res.send('Sesion destruida :D')
})


router.post('/login', ( req, res ) => {
    const { user, pass} = req.body;
    console.log(_user, _pass)
    if(_user == user && _pass == pass){
        req.session.user = user;
        req.session.pass = pass;
        res.redirect('/')
    }else{
        res.redirect('login')
    }
    
})

module.exports = router;