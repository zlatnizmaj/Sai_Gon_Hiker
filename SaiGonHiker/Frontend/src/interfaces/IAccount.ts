export default interface IAccount {
    id: number;
    token?: string;
    userName: string;
    roleName: string;
    fullName: string;
    isSuccess?: boolean;
    staffCode: string;
    location: string;
    isFirstLogin: boolean,
    isDisabled: boolean,
    isConfirmed?: boolean;
}