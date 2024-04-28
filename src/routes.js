const router = require('express').Router();

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoriesController = require('./controllers/accessoriesController');

router.use(homeController);
router.use('/cubes', cubeController);
router.use('/accessories', accessoriesController);
router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;
