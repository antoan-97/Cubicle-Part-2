const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', (req, res) =>{
    const userData = req.body
    // const {name, password, repeatPassword } = req.body
    res.render('/users/login');
})
module.exports = router