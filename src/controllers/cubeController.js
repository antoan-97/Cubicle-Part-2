const router = require('express').Router();

const { itsAuth } = require('../middlewares/authMiddleware');
const cubeManager = require('../managers/cubeManager');
const accessoriesManager = require('../managers/accessoryManager');
const { generateDifficultyOptions } = require('../utils/viewHelper');

router.get('/create', itsAuth, (req, res) => {
    res.render('cube/create');
});

router.post('/create', itsAuth, async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel,
    } = req.body;

    await cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
        owner: req.user._id,
    });

    res.redirect('/');
});

router.get('/:cubeId/details', async (req, res) => {
    const cubeId = req.params.cubeId;

    try {
        const cube = await cubeManager.getOneWithAccessories(cubeId).lean();

        if (!cube) {
            return res.redirect('/404');
        }

        let isOwner = false;

        // Check if the user is logged in and compare user ID with cube owner ID
        if (req.user && req.user._id) {
            const cubeOwnerId = cube.owner && cube.owner.toString();
            const userId = req.user._id.toString();

            if (cubeOwnerId === userId) {
                isOwner = true;
            }
        }

        res.render('cube/details', { cube, isOwner });
    } catch (error) {
        console.error('Error fetching cube details:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:cubeId/attach-accessory',itsAuth, async (req, res) => {

    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoriesManager.getExceptThese(cube.accessories).lean();
    const hasAccessories = accessories.length > 0
    res.render('accessories/attach', { cube, accessories, hasAccessories });

})

router.post('/:cubeId/attach-accessory', itsAuth, async (req, res) => {
    const { accessory: accessoryId } = req.body;
    const cubeId = req.params.cubeId;

    await cubeManager.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cubes/${cubeId}/details`)
})

router.get('/:cubeId/delete', itsAuth, async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();

    const options = generateDifficultyOptions(cube.difficultyLevel);

    res.render('cube/delete', { cube, options });

});

router.post('/:cubeId/delete', itsAuth, async (req, res) => {
    await cubeManager.delete(req.params.cubeId);
    res.redirect('/')
});

router.get('/:cubeId/edit', itsAuth, async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();

    if (cube.owner !== req.user._id) {
        return res.redirect('/404');
    }

    const options = generateDifficultyOptions(cube.difficultyLevel);
    res.render('cube/edit', { cube, options });
});

router.post('/:cubeId/edit', itsAuth, async (req, res) => {
    const cubeData = req.body;

    await cubeManager.update(req.params.cubeId, cubeData);

    res.redirect(`/cubes/${req.params.cubeId}/details`);
});



module.exports = router;