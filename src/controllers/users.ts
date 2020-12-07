import usersQueries from '../providers/users';

const handleUsersPost = async (req: any, res: any, next: any) => {
  const newFormEntry = req.body;
  try {
    const newUser: any = await usersQueries.createUser(
      newFormEntry.email,
      newFormEntry.pw, // hash & salt this instead
      newFormEntry.first_name,
      newFormEntry.last_name,
    );
    console.log(newUser.rows[0].id); // use to make token then send that as response
    return res.status(201).json(newUser);
  } catch (err) {
    return next(err);
  }
};

const handleUsersGet = async (req: any, res: any, next: any) => {
  try {
    const id = Number(req.params.id);
    if (id) {
      const oneUser: any = await usersQueries.readUsers(id);
      const [one] = oneUser.rows.map((mappedUserObj: any) => ({
        id: mappedUserObj.id,
        email: mappedUserObj.email,
        pw: mappedUserObj.pw,
        first_name: mappedUserObj.first_name,
        last_name: mappedUserObj.last_name,
        _created: mappedUserObj.created,
      }));
      return res.status(200).json(one);
    } else {
      const allUsers: any = await usersQueries.readUsers();
      const all = allUsers.rows.map((mappedUserObj: any) => {
        return {
          id: mappedUserObj.id,
          email: mappedUserObj.email,
          pw: mappedUserObj.pw,
          first_name: mappedUserObj.first_name,
          last_name: mappedUserObj.last_name,
          _created: mappedUserObj._created,
        };
      });
      return res.status(200).json(all);
    }
    const allUsers: any = await usersQueries.readUsers();
    const all = allUsers.rows.map((mappedUserObj: any) => ({
      id: mappedUserObj.id,
      email: mappedUserObj.email,
      pw: mappedUserObj.pw,
      first_name: mappedUserObj.first_name,
      last_name: mappedUserObj.last_name,
      _created: mappedUserObj.created,
    }));
    return res.status(200).json(all);
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
