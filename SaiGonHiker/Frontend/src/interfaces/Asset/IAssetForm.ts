export default interface IAssetForm {
  id?: string;
  assetCode?: string,
  name: string;
  categoryId?: number;
  specification: string;
  installedDate?: Date;
  stateId: number;
  location?: string;
  isDelete?: boolean;
}
