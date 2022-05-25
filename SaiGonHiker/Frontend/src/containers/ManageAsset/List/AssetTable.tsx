import React, { useEffect, useState } from 'react'
import { PencilFill, XCircle } from 'react-bootstrap-icons'
import { useHistory } from 'react-router'

import { NotificationManager } from 'react-notifications'
import Info from '../Info'

import {
  AssignedValue
} from '../../../constants/Asset/AssetConstant'
import ButtonIcon from 'src/components/ButtonIcon'
import Table, { SortType } from 'src/components/Table'
import IAsset from 'src/interfaces/Asset/IAsset'
import IColumnOption from 'src/interfaces/IColumnOption'
import IQueryAssetModel from 'src/interfaces/Asset/IQueryAssetModel'
import { PagedModel } from 'src/types/PagedModel'
import { EDIT_ASSET_ID } from 'src/constants/pages'
import Delete from '../Delete'

const column: IColumnOption[] = [
  { columnName: 'Asset code', columnValue: 'assetCode', isSortable: true },
  { columnName: 'Name', columnValue: 'name', isSortable: true },
  { columnName: 'Category', columnValue: 'category', isSortable: true },
  { columnName: 'State', columnValue: 'stateName', isSortable: true },
]

type Props = {
  pagedAssets: PagedModel<IAsset, IQueryAssetModel> | null
  handlePage: (page: number) => void
  handleSort: (colValue: string) => void
  sortState: SortType
  fetchData: Function
}

const AssetTable: React.FC<Props> = ({
  pagedAssets,
  handlePage,
  sortState,
  handleSort,
  fetchData,
}) => {
  useEffect(() => {
    fetchData()
  }, [])

  const [showDetail, setShowDetail] = useState(false)
  const [assetDetail, setAssetDetail] = useState(null as IAsset | null)

  const [showDelete, setShowDelete] = useState(false)
  const [assetDelete, setAssetDelete] = useState(null as string | null)

  const handleShowInfo = (assetCode: string) => {
    const asset = pagedAssets?.items.find(
      (item) => item.assetCode === assetCode,
    )

    if (asset) {
      setAssetDetail(asset)
      setShowDetail(true)
    }
  }

  const handleCloseDetail = () => {
    setShowDetail(false)
  }

  const history = useHistory()
  const handleEdit = (assetCode: string) => {
    history.push(EDIT_ASSET_ID(assetCode));
  };

  const handleDelete = (assetCode: string) => {
    setAssetDelete(assetCode)
    setShowDelete(true)
  }

  const handleCloseDelete = () => {
    setShowDelete(false)
  }

  const handleButtonDisable = (state: number) => {
    if (state == AssignedValue) return true
  }

  const handleResult = (isSuccess: boolean, assetCode: string) => {
    if (isSuccess) {
      NotificationManager.success(
        ` Delete Successfully `,
        ``,
        1000,
      )
      fetchData()
    } else
      NotificationManager.error(` Delete failed `, ``, 1000)
  }

  return (
    <>
      <Table
        columns={column}
        sortState={sortState}
        handleSort={handleSort}
        page={{
          currentPage: pagedAssets?.currentPage,
          totalPage: pagedAssets?.totalPages,
          handleChange: handlePage,
        }}
      >
        {pagedAssets?.items.map((data, index) => (
          <tr
            key={index}
            className=""
            onClick={() => handleShowInfo(data.assetCode)}
          >
            <td>{data.assetCode}</td>
            <td>{data.name}</td>
            <td>{data.category}</td>
            <td>{data.stateName}</td>

            <td className="d-flex" style={{ border: 'none' }}>
              <ButtonIcon onClick={() => handleEdit(data.assetCode)} disable={handleButtonDisable(data.stateId)}>
                <PencilFill className="text-black" />
              </ButtonIcon>

              <ButtonIcon onClick={() => handleDelete(data.assetCode)} disable={handleButtonDisable(data.stateId)}>
                <XCircle className="text-danger mx-2" />
              </ButtonIcon>
            </td>
          </tr>
        ))}
      </Table>
      
      {pagedAssets?.totalItems == 0 ? (
        <h6 className="no-data">No Data Found</h6>
      ) : (
        <></>
      )}

      {showDelete && assetDelete && (
        <Delete
          showModal={showDelete}
          assetCode={assetDelete}
          handleClose={handleCloseDelete}
          handleResult={handleResult}
        />
      )}

      {showDetail && assetDetail && (
        <Info
          showModal={showDetail}
          asset={assetDetail}
          handleClose={handleCloseDetail}
        />
      )}
    </>
  )
}
export default AssetTable
