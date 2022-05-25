import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { MANAGE_ASSIGNMENT } from '../../constants/pages'

const NotFound = lazy(() => import("../NotFound"))
const LisAssignment = lazy(() => import("./List"))
const CreateAssignment = lazy(() => import('./Create'))
const EditAssignment = lazy(() => import('./Update'))

const ManageAssignment = () => {
    return (
        <Switch>
            <Route exact path={MANAGE_ASSIGNMENT.BASE}>
                <LisAssignment/>
            </Route>
            <Route exact path={MANAGE_ASSIGNMENT.CREATE}>
                <CreateAssignment/>
            </Route>
            <Route exact path={MANAGE_ASSIGNMENT.EDIT}>
                <EditAssignment/>
            </Route>
            <Route component={NotFound}/>
        </Switch>
    )
}

export default ManageAssignment
