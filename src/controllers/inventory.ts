import inventoryQueries from '../providers/inventory';

const handleUserInventoryGet = async (req: any, res: any, next: any): Promise<unknown> => {
  try {
    const id = Number(req.params.id);
    const oneIngredient: unknown = await inventoryQueries.readUserInventory(id);
    return res.status(200).json(oneIngredient);
  } catch (err) {
    return next(err);
  }
};

export default {
  handleUserInventoryGet,
};
