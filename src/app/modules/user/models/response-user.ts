export default interface IResponseUser {
    id: IId;
    name: IUserName; 
    dob: IDob; 
    email: any; 
    picture: IPicture; 
    location: ILocation; 
    gender: string;
}

interface IUserName { 
    title: any; 
    first: any; 
    last: any; 
}

interface IStreet { 
    name: any; 
    number: any; 
}

interface ILocation { 
    street: IStreet; 
    city: any; 
    postcode: any; 
};

interface IId { value: any; };

interface IDob { age: any; };

interface IPicture { large: any; } ;

