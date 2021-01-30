import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@yourshop.com',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true,
  },
  {
    name: 'Amine Mouad',
    email: 'amine@gmail.com',
    password: bcrypt.hashSync('amine', 10),
  },
  {
    name: 'Imad Bourouche',
    email: 'imad@gmail.com',
    password: bcrypt.hashSync('imad', 10),
  },
];

export default users;
