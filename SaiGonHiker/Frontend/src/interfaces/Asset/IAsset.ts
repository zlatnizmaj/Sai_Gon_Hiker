export default interface IAsset {
  id: number;
  assetCode: string;
  name: string;
  category: string;
  categoryId: number;
  specification: string;
  installedDate: Date;
  location: string;
  stateId: number;
  stateName: string;
  isDelete: boolean
}
