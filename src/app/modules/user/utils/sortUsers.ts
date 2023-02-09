import { ISortOptions } from "../models/sort-options";
import IUser from "../models/user";

export function sortUsers(firstUser: IUser, secondUser: IUser, sortOptions: ISortOptions): number | null {
    const direction = sortOptions.direction;
    const active = sortOptions.active as keyof IUser;
    const firstUserValue = firstUser[active] as string;
    const secondUserValue = secondUser[active] as string;

    if (direction === 'asc') {
        return firstUserValue > secondUserValue ? 1 : -1;
    } else if (direction === 'desc') {
        return firstUserValue < secondUserValue ? 1 : -1;
    }     

    return null;
}