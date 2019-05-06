const router = require('express').Router();
const uuidv1 = require('uuid/v1');
// Info temporal para loggearse 
const _user = 'root'; 
const _pass = 'admin';
const uuid = uuidv1();

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

        req.session.permisos = {
            clientes: {
                crear: true,
                leer: true,
                actualizar: true,
                eliminar: true,
            }
        }
        req.session.user = uuid;
        res.redirect('/')
    }else{
        res.redirect('login')
    }
    
})

module.exports = router;