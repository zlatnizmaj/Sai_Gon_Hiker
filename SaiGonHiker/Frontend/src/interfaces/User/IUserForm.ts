export default interface IUserForm {
    id? : string,
    firstName: string,
    lastName: string,
    dateOfBirth?: Date,
    gender: string,
    joinedDate?: Date,
    type?: number,
    location?: string,
    staffCode: string,
}