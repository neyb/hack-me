import { Assignation as AssignationDomain } from "@/logic/domain/assignation/assignation";
import { atom } from "recoil";

export module State {
  export type Assignation = {
    deskId: string;
    employeeId: string;
  };

  export const fromAssignation = (
    assignation: AssignationDomain
  ): State.Assignation => ({
    deskId: assignation.desk.id,
    employeeId: assignation.employee.id,
  });
}

export const assignationAtom = atom({
  key: "assignationsAtom",
  default: [] as State.Assignation[],
});
