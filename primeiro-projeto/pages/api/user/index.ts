import { NextApiHandler } from 'next';
import { Users } from '@/utils/users';

// Getting sll users
const handleGet: NextApiHandler = async (req, res) => {
  const { search, age } = req.query;

  let arrayRes = [];

  if (search || age) {
    for (let i in Users) {
      if (Users[i].name === search || Users[i].age.toString() === age) {
        arrayRes.push(Users[i]);
      }
    }
    res.status(200).json(arrayRes);
  }
  return res.json(Users);
};

// Inserting new user
const handlePost: NextApiHandler = async (req, res) => {
  const { name, age } = req.body;

  if(name || age){
    res.status(201).json({ staus: true, user: { name, age } });
  }
};

const handle: NextApiHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      handleGet(req, res);
      break;
    case 'POST':
      handlePost(req, res);
      break;
  }
};

export default handle;
