import { address } from "./address";

export default interface IUserForm {
    firstName: string;
    lastName: string;
    age: number;
    gender: boolean;
    department: string;
    company: string;
    email: string;
    addresses: address[];
    imageUrl?: string;
}