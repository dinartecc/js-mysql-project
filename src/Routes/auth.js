import VerificarLogin from '../AuthComponents/VerificarLogin/VericarLogin';
const router = require('express').Router();


router.get('/login',(req, res) => {
    
    res.render('inicio.hbs');
    
})

router.get('/islogged', (req, res) =>{
  if(typeof req.session.user !== 'undefined'){
    res.send(true)
  }else{
    res.send(false)
  }
})


router.get('/userinfo', (req, res) =>{
  if(typeof req.session !== 'undefined'){

    const permissions =  {
      clasificacion: 1
    };
    const _user = {
      nombre: 'Leonel'
    }


    res.send(JSON.stringify({permissions, user:_user}))
  }else{
    res.status(404).end()
  }
})

router.get('/logout' , (req,res) => {
    req.session.destroy()
    res.send('Sesion destruida :D')
})


router.post('/login', ( req, res ) => {

 
    const permissions =  {
      clasificacion: 1
    };
    const _user = {
      nombre: 'Leonel'
    }

  const { user, pass} = req.body;
  console.log(req.body)
  VerificarLogin(user,pass)
    .then( () => {
      req.session.user = user;
      req.session.pass = pass;
      res.send(JSON.stringify({permissions, user:_user}))
    })
    .catch( (response) => res.status(205).send('Informacion incorrecta!') );
    
    
})

module.exports = router;
