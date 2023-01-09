import IUser from "../models/user";

export const USERS: IUser[] = [
  {
      id: 1,
      firstName: 'Kate',
      lastName: 'Ivanova',
      age: 20,
      gender: false,
      department: 'marketing',
      company: 'Google',
      email:"Kate@gmail.com",
      imageUrl: 'assets/img/user/avatar_f.png',
      addresses: []
  },
  {
      id: 2,
      firstName: 'Dima',
      lastName: 'Bavelko',
      age: 24,
      gender: true,
      department: 'front end',
      company: 'Coherent', email:"Dima@gmail.com",
      imageUrl: 'assets/img/user/avatar_m.png',
      addresses: []
  },
  {
      id: 3,
      firstName: 'Elon',
      lastName: 'Musk',
      age: 50,
      gender: true,
      department: 'CEO',
      company: 'Tesla',
      email:"Elon@gmail.com",
      imageUrl: 'assets/img/user/musk.png',
      addresses: []
  },
  {
      id: 4,
      firstName: 'Anna',
      lastName: 'Petrova',
      age: 18,
      gender: false,
      department: 'IT',
      company: 'Google',
      email:"Anna@gmail.com",
      imageUrl: 'assets/img/user/girl.jpg',
      addresses: [],
  },
  {
      id: 5,
      firstName: 'Max',
      lastName: 'Popov',
      age: 33,
      gender: true,
      department: 'sales',
      company: 'BMW',
      email:"Max@gmail.com",
      imageUrl: 'assets/img/user/avatar_african.png',
      addresses: []
  },
];