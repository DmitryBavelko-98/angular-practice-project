import IUser from "../models/user";

export const USERS: IUser[] = [
  {
      id: '1',
      firstName: 'Kate',
      lastName: 'Ivanova',
      age: 20,
      gender: false,
      department: 'Marketing',
      company: 'Google',
      email:"KateIvanova@gmail.com",
      imageUrl: 'assets/img/user/avatar_f.png',
      addresses: [{addressLine: 'ul. Pushkina, 1/125', city: 'Minsk', zip: '220120'}]
  },
  {
      id: '2',
      firstName: 'Dima',
      lastName: 'Bavelko',
      age: 24,
      gender: true,
      department: 'Front-end',
      company: 'Coherent', email:"DimaBavelko@gmail.com",
      imageUrl: 'assets/img/user/avatar_m.png',
      addresses: [{addressLine: 'ul. Raynisa, 3/11'}]
  },
  {
      id: '3',
      firstName: 'Elon',
      lastName: 'Musk',
      age: 50,
      gender: true,
      department: 'CEO',
      company: 'Tesla',
      email:"ElonMusk@gmail.com",
      imageUrl: 'assets/img/user/musk.png',
      addresses: [{addressLine: '4608 12th Ave, Sacramento, CA 95820, США', city: 'Sacramento', zip: '1111111'}]
  },
  {
      id: '4',
      firstName: 'Anna',
      lastName: 'Petrova',
      age: 18,
      gender: false,
      department: 'Human resources',
      company: 'Google',
      email:"AnnaPetrova@gmail.com",
      imageUrl: 'assets/img/user/girl.jpg',
      addresses: [
        {addressLine: 'ul. Gromova, 6/23', city: 'Minsk', zip: '220120'},
        {addressLine: 'ul. Lermontova, 43/23', city: 'Moscow', zip: '120220'}
      ],
  },
  {
      id: '5',
      firstName: 'Max',
      lastName: 'Popov',
      age: 33,
      gender: true,
      department: 'Management',
      company: 'BMW',
      email:"MaxPopov@gmail.com",
      imageUrl: 'assets/img/user/avatar_african.png',
      addresses: [{addressLine: 'Strindbergstraße 23', city: 'Berlin', zip: '660550'}]
  },
];