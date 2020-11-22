import express from 'express';

const router = express.Router();

// Get from /:id?
router.get('/:id?', async (req, res) => {
    const id = Number(req.params.id);
    try {
        if (id) {
            res.json('TEST FOOD GET ONE ' + id + ' SUCCESS');
        } else {
            res.json('TEST FOOD GET ALL SUCCESS');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'There was an error', err });
    }
});

// Post to /
router.post('/', async (req, res) => {
    const newFood = req.body;
    try {
        res.json({
            'req.body': { ...newFood },
            msg: 'TEST FOOD POST SUCCESS'
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Code bad', e });
    }
});

// Put to /:id
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const editedFood = req.body;
    try {
        res.json({
            'req.body': { ...editedFood, id },
            msg: 'TEST FOOD EDIT SUCCESS'
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Code bad', e });
    }
});

// Delete from /:id
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        res.json(`TEST DESTROY FOOD ${id} SUCCESS`);
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Code bad', e });
    }
});

export default router;
