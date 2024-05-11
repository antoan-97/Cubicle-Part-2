const router = require('express').Router();
const { MongooseError } = require('mongoose');
const userManager = require('../managers/userManager');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body
    try {
        await userManager.register({ username, password, repeatPassword });
        res.redirect('/users/login');

    } catch (error) {
        if (error instanceof MongooseError) {
            const firstError = Object.values(error.errors)[0].message
            res.status(404).render('users/register', { errorMessage: firstError });
        } else {
            res.status(404).render('users/register', { errorMessage: error.message });
        }
    }
})

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {

    const { username, password } = req.body

    try {
        const token = await userManager.login(username, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        if (error instanceof MongooseError) {
            const firstError = Object.values(error.errors)[0].message
            res.status(404).render('users/login', { errorMessage: firstError });
        } else {
            res.status(404).render('users/login', { errorMessage: error.message });
        }
    }

});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = router