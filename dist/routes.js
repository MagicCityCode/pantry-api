var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
const router = express.Router();
// Get from /:id?
router.get('/:id?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        if (id) {
            res.json('TEST FOOD GET ONE ' + id + ' SUCCESS');
        }
        else {
            res.json('TEST FOOD GET ALL SUCCESS');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'There was an error', err });
    }
}));
// Post to /
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newFood = req.body;
    try {
        res.json({
            'req.body': Object.assign({}, newFood),
            msg: 'TEST FOOD POST SUCCESS'
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Code bad', e });
    }
}));
// Put to /:id
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const editedFood = req.body;
    try {
        res.json({
            'req.body': Object.assign(Object.assign({}, editedFood), { id }),
            msg: 'TEST FOOD EDIT SUCCESS'
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Code bad', e });
    }
}));
// Delete from /:id
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        res.json(`TEST DESTROY FOOD ${id} SUCCESS`);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Code bad', e });
    }
}));
export default router;
