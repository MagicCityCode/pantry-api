import inventoryQueries from '../providers/inventory';

const handleUserAvailableInventoryGet = async (req: any, res: any, next: any) => {
  try {
    const id = Number(req.params.id);
    const inventory: any = await inventoryQueries.readUserAvailableInventory(id);
    return res.status(200).json(inventory[3].rows);
  } catch (err) {
    return next(err);
  }
};

// const handleUserAllUnexpiredInventoryGet = async (
//   req: any,
//   res: any,
//   next: any,
// ): Promise<unknown> => {
//   try {
//     const id = Number(req.params.id);
//     const oneIngredient: unknown = await inventoryQueries.readUserInventoryCommittedAndUncommitted(
//       id,
//     );
//     return res.status(200).json(oneIngredient);
//   } catch (err) {
//     return next(err);
//   }
// };

export default {
  handleUserAvailableInventoryGet,
  // handleUserAllUnexpiredInventoryGet,
};
