import { assign, result } from "lodash";
import { Desk } from "../desk";
import { Employee } from "../employee";

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

export type Algorythm = {
  id: string;
  find: (employees: Employee[], desks: Desk[]) => Assignations;
};

export const prioritizePerWish: Algorythm = {
  id: "prioritizePerWish",
  find: (employees: Employee[], desks: Desk[]) => {
    let allPreferedAssignations = employees.map((employee) =>
      employee.preferedAssignations()
    );

    const preferedAssignationsAt = (wishIndex: number) =>
      allPreferedAssignations
        .filter(
          (preferedAssignations) => preferedAssignations.length > wishIndex
        )
        .map((preferedAssignations) => preferedAssignations[wishIndex]);

    const removeAssignationsIncompatibleWith = (assignation: Assignation) => {
      allPreferedAssignations = allPreferedAssignations.map(
        (preferedAssignations) =>
          preferedAssignations.filter((currentAssignation) =>
            currentAssignation.isCompatibleWith(assignation)
          )
      );
    };

    let assignations = new Assignations();

    for (
      let [wishIndex, currentPreferedAssignations] = [
        0,
        preferedAssignationsAt(0),
      ];
      currentPreferedAssignations.length > 0;
      [wishIndex, currentPreferedAssignations] = [
        wishIndex + 1,
        preferedAssignationsAt(wishIndex + 1),
      ]
    ) {
      for (const assignation of currentPreferedAssignations) {
        if (assignations.canTake(assignation)) {
          removeAssignationsIncompatibleWith(assignation);
          assignations = assignations.add(assignation);
        }
      }
    }

    return assignations;
  },
};
