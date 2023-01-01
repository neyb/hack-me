import { prioritizePerWish } from "@/logic/domain/assignation/assignation";
import { useRecoilState, useRecoilValue } from "recoil";
import { assignationAtom, AssignationsState } from "./assignations";
import { desksAtom, DeskState, toDesk } from "./desksState";
import {
  EmployeeComputed,
  employeesSelector,
  toEmployee,
} from "@/logic/infra/state/employeeComputed"; //

export const useAssign = () => {
  const [_, setAssignations] = useRecoilState(assignationAtom);
  const employeesComputed = useRecoilValue(employeesSelector);
  const [desksComputed] = useRecoilState(desksAtom);

  return assign(employeesComputed, desksComputed, setAssignations);
};

export const assign =
  (
    employeesComputed: EmployeeComputed[],
    desksComputed: DeskState[],
    setAssignations: (assignations: AssignationsState.Assignation[]) => void
  ) =>
  () => {
    const employees = employeesComputed.map(toEmployee);
    const desks = desksComputed.map(toDesk);
    const assignations = prioritizePerWish.run(employees, desks);
    const state: AssignationsState.Assignation[] =
      assignations.assignations.map((assignation) =>
        AssignationsState.fromAssignation(assignation)
      );
    setAssignations(state);
  };
