import foodsQueries from "../providers/foods";

const handleFoodsPost = async (req: any, res: any, next: any) => {
  const newFormEntry = req.body;
  try {
    const newFood: any = await foodsQueries.createFood(
      newFormEntry.name,
      newFormEntry.type,
      newFormEntry.grp,
      newFormEntry.fam,
      newFormEntry.category,
      newFormEntry.color
    );
    return res.status(201).json(newFood);
  } catch (err) {
    console.log("handleFoodsPost [add filepath soon]", err);
    res.status(500).json({ msg: "Code not working", err });
    return next(err);
  }
};

const handleFoodsGet = async (req: any, res: any, next: any) => {
  try {
    const id = Number(req.params.id);
    if (id) {
      const oneFood: any = await foodsQueries.readFoods(id);
      const [one] = oneFood.rows.map((mappedFoodObj: any) => {
        return {
          id: mappedFoodObj.id,
          name: mappedFoodObj.name,
          type: mappedFoodObj.type,
          grp: mappedFoodObj.grp,
          fam: mappedFoodObj.fam,
          category: mappedFoodObj.category,
          color: mappedFoodObj.color,
          _created: mappedFoodObj._created,
        };
      });
      return res.status(200).json(one);
    } else {
      const allFoods: any = await foodsQueries.readFoods();
      const all = allFoods.rows.map((mappedFoodObj: any) => {
        return {
          id: mappedFoodObj.id,
          name: mappedFoodObj.name,
          type: mappedFoodObj.type,
          grp: mappedFoodObj.grp,
          fam: mappedFoodObj.fam,
          category: mappedFoodObj.category,
          color: mappedFoodObj.color,
          _created: mappedFoodObj._created,
        };
      });
      return res.status(200).json(all);
    }
  } catch (err) {
    console.log("handleFoodsGet [add filepath soon]", err);
    res.status(500).json({ msg: "Code not working", err });
    return next(err);
  }
};

const handleFoodsPut = async (req: any, res: any, next: any) => {
  const id = Number(req.params.id);
  const updatedFormEntry = req.body;
  try {
    const updatedFood: any = await foodsQueries.updateFood(
      updatedFormEntry.name,
      updatedFormEntry.type,
      updatedFormEntry.grp,
      updatedFormEntry.fam,
      updatedFormEntry.category,
      updatedFormEntry.color,
      id
    );
    return res.status(200).json(updatedFood);
  } catch (err) {
    console.log("handleFoodsPut [add filepath soon]", err);
    res.status(500).json({ msg: "Code not working", err });
    return next(err);
  }
};

const handleFoodsDelete = async (req: any, res: any, next: any) => {
  const id = Number(req.params.id);
  try {
    const deletedFood: any = await foodsQueries.deleteFood(id);
    return res.status(202).json(deletedFood);
  } catch (err) {
    console.log("handleFoodsDelete [add filepath soon]", err);
    res.status(500).json({ msg: "Code not working", err });
    return next(err);
  }
};

export default {
  handleFoodsPost,
  handleFoodsGet,
  handleFoodsPut,
  handleFoodsDelete,
};
