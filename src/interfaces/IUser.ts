export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    salt: string;
}

//https://en.wikipedia.org/wiki/Data_transfer_object
//https://newbedev.com/what-is-a-data-transfer-object-dto
export interface IUserInputDTO {
    name: string;
    email: string;
    password: string;
}
