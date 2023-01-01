import { Assignation as AssignationDomain } from "@/logic/domain/assignation";
import { atom } from "recoil";

export module AssignationsState {
  export type Assignation = {
    deskId: string;
    employeeId: string;
  };

  export const fromAssignation = (
    assignation: AssignationDomain
  ): AssignationsState.Assignation => ({
    deskId: assignation.desk.id,
    employeeId: assignation.employee.id,
  });
}

export const assignationAtom = atom({
  key: "assignationsAtom",
  default: [] as AssignationsState.Assignation[],
});
