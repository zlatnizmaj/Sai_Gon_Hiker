import ISelectOption from "src/interfaces/ISelectOption";
import {
  StaffType,
  AdminType,
  AllType,
  StaffLabel,
  AdminLabel,
  AllLabel,
  MaleType,
  FemaleType,
  MaleLabel,
  FemaleLabel,
} from "src/constants/User/UserConstants";

import {
    AvailableValue, 
    NotAvailableValue,
    AssignedValue,
    WaitingForRecyclingValue,
    RecycledValue,
    LaptopValue,
    MonitorValue,
    AllAssetValue,
    PersonalComputerValue,
    AvailableLabel,
    NotAvailableLabel,
    AssignedLabel,
    WaitingForRecyclingLabel,
    RecycledLabel,
    LaptopLabel,
    MonitorLabel,
    PersonalComputerLabel,
    AllAssetLabel
} from "src/constants/Asset/AssetConstant"

import {
  AcceptedValue,
  WaitingForAcceptanceValue,
  AcceptedLabel,
  WaitingForAcceptanceLabel
} from "src/constants/Assignment/AssignmentConstant"

export const UserTypeOptions: ISelectOption[] = [
  { id: 1, label: AllLabel, value: AllType },
  { id: 2, label: AdminLabel, value: AdminType },
  { id: 3, label: StaffLabel, value: StaffType },
];

export const CreateUserTypeOptions: ISelectOption[] = [
  { id: 1, label: AdminLabel, value: 1 },
  { id: 2, label: StaffLabel, value: 2 },
];

export const GenderTypeOptions: ISelectOption[] = [
  { id: 1, label: MaleLabel, value: MaleType },
  { id: 2, label: FemaleLabel, value: FemaleType },
];

export const StateTypeOptions: ISelectOption[] = [
  { id: 1, label: AvailableLabel, value: AvailableValue },
  { id: 2, label: NotAvailableLabel, value: NotAvailableValue },
  { id: 3, label: AssignedLabel, value: AssignedValue },
  { id: 4, label: WaitingForRecyclingLabel, value: WaitingForRecyclingValue },
  { id: 5, label: RecycledLabel, value: RecycledValue },
];

export const StateAssetTypeOptions: ISelectOption[] = [
    { id: 1, label: AllAssetLabel, value: AllAssetValue },
    { id: 2, label: AvailableLabel, value: AvailableValue },
    { id: 3, label: NotAvailableLabel, value: NotAvailableValue },
    { id: 4, label: AssignedLabel, value: AssignedValue },
    { id: 5, label: WaitingForRecyclingLabel, value: WaitingForRecyclingValue },
    { id: 6, label: RecycledLabel, value: RecycledValue },
];

export const CreateStateAssetTypeOptions: ISelectOption[] = [
  { id: 1, label: AvailableLabel, value: AvailableValue },
  { id: 2, label: NotAvailableLabel, value: NotAvailableValue },
];

export const UpdateStateAssetTypeOptions: ISelectOption[] = [
    { id: 1, label: AvailableLabel, value: AvailableValue },
    { id: 2, label: NotAvailableLabel, value: NotAvailableValue },
    { id: 3, label: WaitingForRecyclingLabel, value: WaitingForRecyclingValue },
    { id: 4, label: RecycledLabel, value: RecycledValue },
];

export const CategoryAssetTypeOptions: ISelectOption[] = [
    { id: 1, label: AllAssetLabel, value: AllAssetValue },
    { id: 2, label: LaptopLabel, value: LaptopValue },
    { id: 3, label: MonitorLabel, value: MonitorValue },
    { id: 4, label: PersonalComputerLabel, value: PersonalComputerValue }
];

export const StateAssignmentTypeOptions: ISelectOption[] = [
  { id: 1, label: AllAssetLabel, value: AllAssetValue },
  { id: 4, label: AcceptedLabel, value: AcceptedValue },
  { id: 5, label: WaitingForAcceptanceLabel, value: WaitingForAcceptanceValue },
]
