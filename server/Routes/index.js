const router = require('express').Router();


router.get('/',(req, res) => {
    res.send('HOLAA');
})


module.exports = router;