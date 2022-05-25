import React, { useEffect, useState } from 'react'
import { FunnelFill } from 'react-bootstrap-icons'
import { Search as SearchIcon } from 'react-feather'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'

import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { getUsers } from '../reducer'
import { Link } from 'react-router-dom'
import UserTable from './UserTable'
import { MANAGE_USER } from 'src/constants/pages'
import IQueryUserModel from 'src/interfaces/User/IQueryUserModel'
import ISelectOption from 'src/interfaces/ISelectOption'
import { UserTypeOptions } from 'src/constants/selectOptions'
import {
  ACCSENDING,
  DECSENDING,
  DEFAULT_USER_SORT_COLUMN_NAME,
  DEFAULT_PAGE_LIMIT,
} from 'src/constants/paging'
const ManageUser = () => {
  const dispatch = useAppDispatch()
  const { pagedUsers, userResult } = useAppSelector(
    (state) => state.userReducer,
  )
  const { account } = useAppSelector((state) => state.authReducer)

  const [query, setQuery] = useState({
    Page: 1,
    Limit: DEFAULT_PAGE_LIMIT,
    SortOrder: ACCSENDING,
    SortColumn: DEFAULT_USER_SORT_COLUMN_NAME,
    Location: account?.location,
  } as IQueryUserModel)

  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState([
  ] as ISelectOption[])

  const handleType = (selected: ISelectOption[]) => {
    if (selected.length === 0) {
      setQuery({
        ...query,
        Types: [],
        Page: 1,
      })

      setSelectedType([UserTypeOptions[0]])
      return
    }
    const selectedAll = selected.find((item) => item.id === 1)

    setSelectedType((prevSelected) => {
      if (!prevSelected.some((item) => item.id === 1) && selectedAll) {
        setQuery({
          ...query,
          Types: [],
          Page: 1,
        })

        return [selectedAll]
      }

      const newSelected = selected.filter((item) => item.id !== 1)
      const Types = newSelected.map((item) => item.value)

      setQuery({
        ...query,
        Types: Types as string[],
        Page: 1,
      })

      return newSelected
    })
  }

  const handleChangeSearch = (e) => {
    e.preventDefault()

    const Search = e.target.value
    setSearch(Search)
  }

  const handlePage = (Page: number) => {
    setQuery({
      ...query,
      Page,
    })
  }

  const handleSearch = () => {
    setQuery({
      ...query,
      Search: search,
      Page: 1,
    })
  }

  const handleSort = (SortColumn: string) => {
    const SortOrder = query.SortOrder === ACCSENDING ? DECSENDING : ACCSENDING

    setQuery({
      ...query,
      SortOrder,
      SortColumn,
    })
  }

  const fetchData = () => {
    if (query.Location) dispatch(getUsers(query))
  }

  useEffect(() => {
    if (!query.Location) {
      setQuery({
        ...query,
        Location: account?.location,
      })
    }
    fetchData()
  }, [query, account])

  const style = {
    dropdownButton: () => ({
      maxWidth: '100%',
      width: '200px',
      backgroundColor: '#fff',
      boxShadow: 'none',
      padding: '8px 8px 4px 8px',
      fontWidth: '400',
      display: 'inline-flex',
      textAlign: 'left',
      borderRight: '1px solid #ddd',
    }),
  }
  return (
    <>
      <div className="primaryColor text-title intro-x">User List</div>
      
      <div>
        <div className="d-flex align-items-center mb-5 intro-x ">
          <div>
            <div className="d-flex align-items-center mr-5 border">
              <ReactMultiSelectCheckboxes
                options={UserTypeOptions}
                hideSearch={true}
                placeholderButtonLabel="Type"
                value={selectedType}
                onChange={handleType}
                styles={style}
              />

              <div className=" p-2">
                <FunnelFill />
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center w-ld ml-auto">
            <div className="input-group">
              <input
                onChange={handleChangeSearch}
                value={search}
                type="text"
                className="form-control"
              />
              <span
                onClick={handleSearch}
                className="d-flex align-items-center rounded-right border-bottom border-top border-right px-2 pointer"
              >
                <SearchIcon />
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center ml-3">
            <Link
              to={MANAGE_USER.CREATE}
              type="button"
              className="btn btn-danger"
            >
              Create new User
            </Link>
          </div>
        </div>

        <UserTable
          pagedUsers={pagedUsers}
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

export default ManageUser
