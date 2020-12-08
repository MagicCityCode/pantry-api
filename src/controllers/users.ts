import usersQueries from '../providers/users';
import { generateHashSalt } from '../utils/passwords';
import createToken from '../utils/tokens';

const handleUsersPost = async (req: any, res: any, next: any) => {
  const newFormEntry = req.body;
  const newFormEntryHashedSaltedPw = generateHashSalt(req.body.pw);
  try {
    const newUser: any = await usersQueries.createUser(
      newFormEntry.email,
      newFormEntryHashedSaltedPw,
      newFormEntry.first_name,
      newFormEntry.last_name,
    );
    const token = createToken({ id: newUser.rows[0].id });
    return res.status(201).json(token);
  } catch (err) {
    return next(err);
  }
};

const handleUsersGet = async (req: any, res: any, next: any) => {
  try {
    const id = Number(req.params.id);
    if (id) {
      const oneUser: any = await usersQueries.readUsers(id);
      return res.status(200).json(oneUser);
    }
    const allUsers: any = await usersQueries.readUsers();
    return res.status(200).json(allUsers);
  } catch (err) {
    return next(err);
  }
};

const handleUsersPut = async (req: any, res: any, next: any) => {
  const id = Number(req.params.id);
  const updatedFormEntry = req.body;
  try {
    const updatedUser: any = await usersQueries.updateUser(
      updatedFormEntry.email,
      updatedFormEntry.pw,
      updatedFormEntry.first_name,
      updatedFormEntry.last_name,
      id,
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};

const handleUsersDelete = async (req: any, res: any, next: any) => {
  const id = Number(req.params.id);
  try {
    const deletedUser: any = await usersQueries.deleteUser(id);
    return res.status(202).json(deletedUser);
  } catch (err) {
    return next(err);
  }
};

export default {
  handleUsersPost,
  handleUsersGet,
  handleUsersPut,
  handleUsersDelete,
};
