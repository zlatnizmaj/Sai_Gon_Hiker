import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

import { MANAGE_USER } from 'src/constants/pages'

const NotFound = lazy(() => import('../NotFound'))
const ListUser = lazy(() => import('./List'))
const CreateUser = lazy(() => import('./Create'))
const EditUser = lazy(() => import('./Update'))

const ManageUser = () => {
  return (
    <Switch>
      <Route exact path={MANAGE_USER.BASE}>
        <ListUser />
      </Route>
      <Route exact path={MANAGE_USER.CREATE}>
        <CreateUser />
      </Route>
      <Route exact path={MANAGE_USER.EDIT}>
        <EditUser />
      </Route>
      <Route component={NotFound} />
    </Switch>
  )
}

export default ManageUser
