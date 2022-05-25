import React, { useEffect, useState } from 'react'
import { PencilFill, XCircle } from 'react-bootstrap-icons'
import { useHistory } from 'react-router-dom'

import ButtonIcon from 'src/components/ButtonIcon'
import Table, { SortType } from 'src/components/Table'
import IUser from 'src/interfaces/User/IUser'
import IColumnOption from 'src/interfaces/IColumnOption'
import IQueryUserModel from 'src/interfaces/User/IQueryUserModel'
import { PagedModel } from 'src/types/PagedModel'
import Info from '../Info'
import { EDIT_USER_ID } from 'src/constants/pages'

const column: IColumnOption[] = [
  { columnName: 'Staff code', columnValue: 'staffCode', isSortable: true },
  { columnName: 'Full Name', columnValue: 'fullName', isSortable: true },
  { columnName: 'Username', columnValue: 'userName', isSortable: false },
  { columnName: 'Joined Date', columnValue: 'joinedDate', isSortable: true },
  { columnName: 'Type', columnValue: 'roleName', isSortable: true },
]

type Props = {
  pagedUsers: PagedModel<IUser, IQueryUserModel> | null
  handlePage: (page: number) => void
  handleSort: (colValue: string) => void
  sortState: SortType
  fetchData: Function
}

const UserTable: React.FC<Props> = ({
  pagedUsers,
  handlePage,
  sortState,
  handleSort,
  fetchData,
}) => {
  useEffect(() => {
    fetchData()
  }, [])

  const [showDetail, setShowDetail] = useState(false)
  const [userDetail, setUserDetail] = useState(null as IUser | null)

  const handleShowInfo = (staffCode: string) => {
    const user = pagedUsers?.items.find((item) => item.staffCode === staffCode)

    if (user) {
      setUserDetail(user)
      setShowDetail(true)
    }
  }

  const handleCloseDetail = () => {
    setShowDetail(false)
  }

  const getDateTime = (date: Date) => {
    const _date = new Date(date)
    const dd = String(_date.getDate()).padStart(2, '0')
    const mm = String(_date.getMonth() + 1).padStart(2, '0')
    const yyyy = _date.getFullYear()

    return dd + '/' + mm + '/' + yyyy
  }

  const history = useHistory()
  const handleEdit = (staffCode: string) => {
    const existUser = pagedUsers?.items.find(
      (item) => item.staffCode === staffCode,
    )
    history.push(EDIT_USER_ID(staffCode), {
      existUser: existUser,
    })
  }

  return (
    <>
      <Table
        columns={column}
        sortState={sortState}
        handleSort={handleSort}
        page={{
          currentPage: pagedUsers?.currentPage,
          totalPage: pagedUsers?.totalPages,
          handleChange: handlePage,
        }}
      >
        {pagedUsers?.items.map((data, index) => (
          <tr
            key={index}
            className=""
            onClick={() => handleShowInfo(data.staffCode)}
          >
            <td>{data.staffCode}</td>
            <td>{data.fullName}</td>
            <td>{data.userName}</td>
            <td>{getDateTime(data.joinedDate)}</td>
            <td>{data.roleName}</td>

            <td className="d-flex" style={{border: "none"}}>
              <ButtonIcon onClick={() => handleEdit(data.staffCode)}>
                <PencilFill className="text-black" />
              </ButtonIcon>
              <ButtonIcon>
                <XCircle className="text-danger mx-2" />
              </ButtonIcon>
            </td>
          </tr>
        ))}
      </Table>
      {pagedUsers?.totalItems == 0 ? (
        <h6 className="no-data">No Data Found</h6>
      ) : (
        <></>
      )}
      {userDetail && showDetail && (
        <Info
          showModal={showDetail}
          user={userDetail}
          handleClose={handleCloseDetail}
        />
      )}
    </>
  )
}
export default UserTable
