import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { MANAGE_ASSET } from 'src/constants/pages'

const NotFound = lazy(() => import('../NotFound'))
const ListAsset = lazy(() => import('./List'))
const CreateAsset = lazy(() => import('./Create'))
const EditAsset = lazy(() => import('./Update'))

const ManageAsset = () => {
  return (
    <Switch>
      <Route exact path={MANAGE_ASSET.BASE}>
        <ListAsset />
      </Route>
      <Route exact path={MANAGE_ASSET.CREATE}>
        <CreateAsset />
      </Route>
      <Route exact path={MANAGE_ASSET.EDIT}>
        <EditAsset />
      </Route>
      <Route component={NotFound} />
    </Switch>
  )
}

export default ManageAsset
