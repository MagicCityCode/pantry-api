import foodsQueries from "../providers/foods";

const handleFoodsGetAll = async (req: any, res: any, next: any) => {
  try {
    const allFoods: any = await foodsQueries.readAll();
    // console.log(allFoods);
    const all = allFoods.rows.map((food: any) => {
      return {
        id: food.id,
        name: food.name,
        type: food.type,
        grp: food.grp,
        fam: food.fam,
        category: food.category,
        color: food.color,
        _created: food._created,
      };
    });
    return res.status(200).json(all);
  } catch (err) {
    console.log("handleFoodsGetAll [add filepath soon]", err);
    res.status(500).json({ msg: "Code not working", err });
    return next(err);
  }
};

export default {
  handleFoodsGetAll,
};
