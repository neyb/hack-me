import { assign, result } from "lodash";
import { Desk } from "./desk";
import { Employee } from "./employee";

export class Assignation {
  constructor(readonly employee: Employee, readonly desk: Desk) {}

  equals = (other: Assignation) =>
    this.desk.equals(other.desk) && this.employee.equals(other.employee);

  isCompatibleWith = (other: Assignation) =>
    !(this.desk.equals(other.desk) || this.employee.equals(other.employee));
}

export class Assignations {
  constructor(readonly assignations: Assignation[] = []) {
    if (!this.isValid()) throw new Error("invalid assignations");
  }

  canTake = (assignation: Assignation) =>
    Assignations.isValid([...this.assignations, assignation]);

  add = (assignation: Assignation) =>
    new Assignations([...this.assignations, assignation]);

  some = (predicate: (assignation: Assignation) => boolean) =>
    this.assignations.some(predicate);

  private isValid = () => Assignations.isValid(this.assignations);

  private static isValid = (assignations: Assignation[]) =>
    assignations.every((validatingAssignation, validatingIndex, assignations) =>
      assignations
        .slice(validatingIndex + 1)
        .every((assignation) =>
          assignation.isCompatibleWith(validatingAssignation)
        )
    );
}
