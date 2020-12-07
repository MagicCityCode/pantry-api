import ingredientsQueries from "../providers/ingredients";

const handleIngredientsPost = async (req: any, res: any, next: any) => {
  const newFormEntry = req.body;
  try {
    const newIngredient: any = await ingredientsQueries.createIngredient(
      newFormEntry.name,
      newFormEntry.shelf_life,
      newFormEntry.shelf_life_unit,
      newFormEntry.storage,
      newFormEntry.uom
    );
    return res.status(201).json(newIngredient);
  } catch (err) {
    return next(err);
  }
};

const handleIngredientsGet = async (req: any, res: any, next: any) => {
  try {
    const id = Number(req.params.id);
    if (id) {
      const oneIngredient: any = await ingredientsQueries.readIngredients(id);
      const [one] = oneIngredient.rows.map((mappedIngredientObj: any) => {
        return {
          id: mappedIngredientObj.id,
          name: mappedIngredientObj.name,
          shelf_life: mappedIngredientObj.shelf_life,
          shelf_life_unit: mappedIngredientObj.shelf_life_unit,
          storage: mappedIngredientObj.storage,
          uom: mappedIngredientObj.uom,
          _created: mappedIngredientObj._created,
        };
      });
      return res.status(200).json(one);
    } else {
      const allIngredients: any = await ingredientsQueries.readIngredients();
      const all = allIngredients.rows.map((mappedIngredientObj: any) => {
        return {
          id: mappedIngredientObj.id,
          name: mappedIngredientObj.name,
          shelf_life: mappedIngredientObj.shelf_life,
          shelf_life_unit: mappedIngredientObj.shelf_life_unit,
          storage: mappedIngredientObj.storage,
          uom: mappedIngredientObj.uom,
          _created: mappedIngredientObj._created,
        };
      });
      return res.status(200).json(all);
    }
  } catch (err) {
    return next(err);
  }
};

const handleIngredientsPut = async (req: any, res: any, next: any) => {
  const id = Number(req.params.id);
  const updatedFormEntry = req.body;
  try {
    const updatedIngredient: any = await ingredientsQueries.updateIngredient(
      updatedFormEntry.name,
      updatedFormEntry.shelf_life,
      updatedFormEntry.shelf_life_unit,
      updatedFormEntry.storage,
      updatedFormEntry.uom,
      id
    );
    return res.status(200).json(updatedIngredient);
  } catch (err) {
    return next(err);
  }
};

const handleIngredientsDelete = async (req: any, res: any, next: any) => {
  const id = Number(req.params.id);
  try {
    const deletedIngredient: any = await ingredientsQueries.deleteIngredient(id);
    return res.status(202).json(deletedIngredient);
  } catch (err) {
    return next(err);
  }
};

export default {
  handleIngredientsPost,
  handleIngredientsGet,
  handleIngredientsPut,
  handleIngredientsDelete,
};
