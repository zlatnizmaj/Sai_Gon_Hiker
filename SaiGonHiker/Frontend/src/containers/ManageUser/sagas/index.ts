import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import IQueryUserModel from 'src/interfaces/User/IQueryUserModel';

import { createUser, getUsers, updateUser, disableUser, getUserByStaffCode, getAssignmentUsers } from '../reducer';
import { handleCreateUser, handleGetUsers, handleUpdateUser, handleDisableUser, handleGetUserByStaffCode } from './handles';

export default function* UserSagas() {
    yield takeLatest(createUser.type, handleCreateUser);
    yield takeLatest(getUsers.type, (action: PayloadAction<IQueryUserModel>) => handleGetUsers(action, false));
    yield takeLatest(getAssignmentUsers.type, (action: PayloadAction<IQueryUserModel>) => handleGetUsers(action, true));
    yield takeLatest(updateUser.type, handleUpdateUser);
    yield takeLatest(disableUser.type, handleDisableUser);
    yield takeLatest(getUserByStaffCode.type, handleGetUserByStaffCode);
}
