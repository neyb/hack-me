import { Desk } from "../desk";
import { Employee } from "../employee";

export type Assignation = {
  desk: Desk;
  employee: Employee;
};

export class Assignations {
  constructor(private assignations: Assignation[] = []) {
    if (!this.isValid()) throw new Error("invalid assignations");
  }

  private isValid = (): boolean => {
    return this.assignations.every(
      (validatingAssignation, validatingIndex, assignations) => {
        assignations.findIndex(
          (assignation) =>
            assignation.employee.id == validatingAssignation.employee.id ||
            assignation.desk.id == validatingAssignation.desk.id
        ) == validatingIndex;
      }
    );
  };
}

export type algorythm = (
  allEmployees: Employees[],
  allDesks: Desk[]
) => Assignation[];
