import { throwError } from "@/utils/lang";
import { RecoilValueReadOnly, selector } from "recoil";
import { Desk, desksAtom } from "./desksState";
import { employeesAtom, EmployeeState } from "./employeesState";

export type EmployeeComputed = {
  readonly id: string;
  readonly name: string;
  readonly preferedDesks: Desk[];
};

// TODO FIXME need to test this selector
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
  (desks: Desk[]) => (employee: EmployeeState) => ({
    id: employee.id,
    name: employee.name,
    preferedDesks: employee.preferedDesksIds.map(
      (deskId) =>
        desks.find((desk) => desk.id === deskId) ??
        throwError(`no desk found for id : ${deskId}`)
    ),
  });
