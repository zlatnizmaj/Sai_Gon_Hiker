const Endpoints = {
    authorize: 'api/Auth',
    me: 'api/Auth/me',
    user: 'api/User',
    asset: 'api/Asset',
    category: 'api/Category',
    assignment: 'api/Assignment',
    myassignment: 'api/MyAssignment',
    userId: (staffCode: string) => `api/User/${staffCode}`,
    assetCode: (assetCode: string) => `api/Asset/${assetCode}`,
    assignmentId: (id: string | number) => `api/Assignment/${id}`,
    acceptAssignmentId: (id: string | number) => `api/MyAssignment/Accept/${id}`,
    declineAssignmentId: (id: string | number) => `api/MyAssignment/Decline/${id}`,

};

export default Endpoints;
