import IUser from "../models/user";

export function filterUsersByName(user: IUser, filter: string): boolean {
    return `${user.firstName} ${user.lastName}`.toLowerCase().includes(filter);
}