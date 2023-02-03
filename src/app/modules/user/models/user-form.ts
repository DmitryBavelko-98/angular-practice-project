import { Address } from "./address";

export default interface IUserForm {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    department: string;
    company: string;
    email: string;
    addresses: Address[];
    imageUrl?: string;
}