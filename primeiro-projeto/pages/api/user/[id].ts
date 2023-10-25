import { Users } from '@/utils/users';
import { NextApiHandler } from 'next';
import { use } from 'react';

const handle: NextApiHandler = (req, res) => {
  const { id } = req.query;

  for (let i in Users) {
    if (Users[i].id.toString() === id) {
      res.json(Users[i]);
      return;
    }
  }

  res.json({
    error: 'Usuário não encontrado',
  });
};
export default handle;
