import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'

import { getMyAssignments } from '../reducer'
import AssignmentTable from './MyAssignmentTable'
import IQueryAssignmentModel from 'src/interfaces/Assignment/IQueryAssignmentModel'
import {
  ACCSENDING,
  DECSENDING,
  DEFAULT_ASSET_SORT_COLUMN_NAME,
  DEFAULT_PAGE_LIMIT,
} from 'src/constants/paging'

const ManageAssignment = () => {
  const dispatch = useAppDispatch()

  const { pagedAssignments, assignmentResult } = useAppSelector(
    (state) => state.myassignmentReducer,
  )

  const { account } = useAppSelector((state) => state.authReducer)

  const [query, setQuery] = useState({
    Page: 1,
    Limit: DEFAULT_PAGE_LIMIT,
    SortOrder: ACCSENDING,
    SortColumn: DEFAULT_ASSET_SORT_COLUMN_NAME,
    Search: '',
  } as IQueryAssignmentModel)

  const handlePage = (Page: number) => {
    setQuery({
      ...query,
      Page,
    })
  }

  function handleSort(SortColumn: string) {
    const SortOrder = query.SortOrder === ACCSENDING ? DECSENDING : ACCSENDING

    setQuery({
      ...query,
      SortOrder,
      SortColumn,
    })
  }

  const fetchData = () => {
    dispatch(getMyAssignments(query))
  }

  useEffect(() => {
    dispatch(getMyAssignments(query))
  }, [query, account])

  return (
    <>
      <div className="primaryColor text-title intro-x">My Assignment</div>

      <div>
        <AssignmentTable
          pagedAssignments={pagedAssignments}
          handlePage={handlePage}
          handleSort={handleSort}
          sortState={{
            columnValue: query.SortColumn,
            orderBy: query.SortOrder,
          }}
          fetchData={fetchData}
        />
      </div>
    </>
  )
}

export default ManageAssignment
