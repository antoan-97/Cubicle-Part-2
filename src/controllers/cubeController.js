const router = require('express').Router();

const cubeManager = require('../managers/cubeManager');
const accessoriesManager = require('../managers/accessoryManager');

router.get('/create', (req, res) => {
    res.render('cube/create');
});

router.post('/create', async (req, res) => {
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
        owner:req.user._id,
    });

    res.redirect('/');
});

router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeManager.getOneWithAccessories(req.params.cubeId).lean();

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('cube/details', { cube });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {

    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoriesManager.getExceptThese(cube.accessories).lean();
    const hasAccessories = accessories.length > 0 
    res.render('accessories/attach', { cube, accessories, hasAccessories });

})

router.post('/:cubeId/attach-accessory', async ( req, res) =>{
    const { accessory: accessoryId } = req.body;
    const cubeId = req.params.cubeId;

    await cubeManager.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cubes/${cubeId}/details`)
})

router.get('/:cubeId/delete' , async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();

    res.render('cube/delete', { cube });

});

router.post('/:cubeId/delete', async (req,res) =>{
    await cubeManager.delete(req.params.cubeId);
    res.redirect('/')
});

router.get('/:cubeId/edit', async (req,res) =>{
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    res.render('cube/edit', { cube });
});


module.exports = router;