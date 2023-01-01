import { Desk } from "@/logic/domain/desk";
import { Employee } from "@/logic/domain/employee";
import { throwError } from "@/utils/lang";
import { RecoilValueReadOnly, selector } from "recoil";
import { DeskState, desksAtom } from "./desksState";
import { employeesAtom, EmployeeState } from "./employeesState";

export type EmployeeComputed = {
  readonly id: string;
  readonly name: string;
  readonly preferedDesks: DeskState[];
};

export const toEmployee = ({
  id,
  name,
  preferedDesks,
}: EmployeeComputed): Employee => {
  return new Employee(
    id,
    name,
    preferedDesks.map(({ id, label }) => new Desk(id, label))
  );
};

export const employeesSelector: RecoilValueReadOnly<EmployeeComputed[]> =
  selector({
    key: "employeesSelector",
    get: ({ get }) => {
      const employees = get(employeesAtom);
      const desks = get(desksAtom);
      return employees.map(computeEmployee(desks));
    },
  });

export const computeEmployee =
  (desks: DeskState[]) => (employee: EmployeeState) => ({
    id: employee.id,
    name: employee.name,
    preferedDesks: employee.preferedDesksIds.map(
      (deskId) =>
        desks.find((desk) => desk.id === deskId) ??
        throwError(`no desk found for id : ${deskId}`)
    ),
  });
