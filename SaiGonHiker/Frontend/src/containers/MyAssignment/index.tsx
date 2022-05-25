import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { HOME } from '../../constants/pages'

const NotFound = lazy(() => import("../NotFound"))
const ListAssignment = lazy(() => import("./List"))

const MyAssignment = () => {
    return (
        <Switch>
            <Route exact path={HOME}>
                <ListAssignment/>
            </Route>
            <Route component={NotFound}/>
        </Switch>
    )
}

export default MyAssignment
