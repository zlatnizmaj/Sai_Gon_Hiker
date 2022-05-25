import AuthorizeSagas from 'src/containers/Authorize/sagas';
import UserSagas from 'src/containers/ManageUser/sagas';
import AssetSagas from 'src/containers/ManageAsset/sagas';
import AssignmentSagas from '../../containers/ManageAssignment/sagas';
import MyAssignmentSagas from '../../containers/MyAssignment/sagas';
export default [
    AuthorizeSagas,
    UserSagas,
    AssetSagas,
    AssignmentSagas,
    MyAssignmentSagas
];
