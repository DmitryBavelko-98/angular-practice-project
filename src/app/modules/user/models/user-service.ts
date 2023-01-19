export default interface IUserService {
    id: { value: any; };
    name: { title: any; first: any; last: any; }; 
    dob: { age: any; }; 
    email: any; 
    picture: { large: any; }; 
    location: { street: { name: any; number: any; }; 
    city: any; postcode: any; }; 
}