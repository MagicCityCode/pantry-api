import inventoryQueries from '../providers/inventory';

const handleUserAvailableInventoryWithDaysTillExpirationGet = async (
  req: any,
  res: any,
  next: any,
) => {
  try {
    const id = Number(req.params.id);
    const inventory: any = await inventoryQueries.readUserAvailableInventoryWithDaysTillExpiration(
      id,
    );
    return res.status(200).json(inventory.rows);
  } catch (err) {
    return next(err);
  }
};

const handleUserAllUnexpiredInventoryRegardlessOfDaysTillExpirationGet = async (
  req: any,
  res: any,
  next: any,
) => {
  try {
    const id = Number(req.params.id);
    const inventory: any = await inventoryQueries.readUserAllUnexpiredInventoryDaysTillExpirationUnspecified(
      id,
    );
    return res.status(200).json(inventory.rows);
  } catch (err) {
    return next(err);
  }
};

export default {
  handleUserAvailableInventoryWithDaysTillExpirationGet,
  handleUserAllUnexpiredInventoryRegardlessOfDaysTillExpirationGet,
};
