import IResponseUser from "../models/response-user";
import IUser from "../models/user";

export default function transformUserData(user: IResponseUser): IUser {
    return  {
      id: user.id.value || 'data is not provided',
      firstName: `${user.name.title} ${user.name.first}`,
      lastName:  `${user.name.last}`,
      age: user.dob.age,
      gender: (user.gender === "male") ? true : false,
      department: 'Marketing',
      company: 'Google',
      email: user.email,
      imageUrl: user.picture.large,
      addresses: [
        {
          addressLine: `${user.location.street.name} ${user.location.street.number}`, 
          city: user.location.city, 
          zip: user.location.postcode
        }
      ],
    } as IUser;
  }