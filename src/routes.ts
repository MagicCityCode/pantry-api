import express from 'express';
import passport from 'passport';
import ingredients from './controllers/ingredients';
import inventory from './controllers/inventory';
import users from './controllers/users';
import spoonacular from './controllers/spoonacular';
import amazonFresh from './controllers/amazonFresh';
import { ReqUser } from './utils/interfaces';
import createToken from './utils/tokens';

const router = express.Router();

// INGREDIENTS
router.post(
  '/ingredients',
  // passport.authenticate('jwt'),
  ingredients.handleIngredientsPost,
);
router.get('/ingredients/:id?', ingredients.handleIngredientsGet);
router.put('/ingredients/:id', passport.authenticate('jwt'), ingredients.handleIngredientsPut);
router.delete(
  '/ingredients/:id',
  passport.authenticate('jwt'),
  ingredients.handleIngredientsDelete,
);

// INVENTORY
router.get(
  '/available-inventory/:id',
  // passport.authenticate('jwt'),
  inventory.handleUserAvailableInventoryGet,
);
// router.get(
//   '/inventory-all-unexpired-regardless-of-commitment-status/:id',
//   passport.authenticate('jwt'),
//   inventory.handleUserAllUnexpiredInventoryGet,
// );

// SPOONACULAR
router.get('/joke', spoonacular.handleJokeGet);
router.post('/recipes-by-ingredients', spoonacular.handleFindRecipesByIngredientsGet);

// AMAZON FRESH
router.post('/populate-amazon-cart', amazonFresh.handleIngredients);

// USERS/AUTH
router.post('/register', users.handleUsersPost);
router.get('/users/:id?', users.handleUsersGet);
router.put('/users/:id', users.handleUsersPut);
router.delete('/users/:id', users.handleUsersDelete);
router.post('/login', passport.authenticate('local'), async (req: ReqUser, res) => {
  const userDTO = req.user;
  try {
    const token = createToken({ id: userDTO?.id });
    res.json({
      token,
    });
  } catch (err) {
    console.log(err, err.message);
    res.status(500).json('Login route not working');
  }
});
router.get('/token', passport.authenticate('jwt'), (req, res) => res.sendStatus(200));

export default router;
