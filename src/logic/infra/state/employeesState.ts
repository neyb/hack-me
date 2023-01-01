import { atom } from "recoil";
import { DeskState } from "./desksState";

export type EmployeeState = {
  readonly id: string;
  readonly name: string;
  readonly preferedDesksIds: string[];
};

export const employeesAtom = atom({
  key: "employeesAtom",
  default: [
    { id: "1", name: "employee 1", preferedDesksIds: ["1", "2"] },
    { id: "2", name: "employee 2", preferedDesksIds: ["2", "3"] },
    { id: "3", name: "employee 3", preferedDesksIds: ["3", "4"] },
  ] as EmployeeState[],
});
