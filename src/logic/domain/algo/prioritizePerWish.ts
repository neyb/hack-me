import { Desk } from "../desk";
import { Employee } from "../employee";
import { Assignations, Assignation } from "../assignation";
import { AssignAlgo } from "./AssignAlgo";

export const prioritizePerWish: AssignAlgo = {
  id: "prioritizePerWish",
  run: (employees: Employee[], desks: Desk[]) => {
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
      let [wishIndex, PreferedAssignationsAtSameIndex] = [
        0,
        preferedAssignationsAt(0),
      ];
      PreferedAssignationsAtSameIndex.length > 0;
      [wishIndex, PreferedAssignationsAtSameIndex] = [
        wishIndex + 1,
        preferedAssignationsAt(wishIndex + 1),
      ]
    ) {
      for (const assignation of PreferedAssignationsAtSameIndex) {
        if (assignations.canTake(assignation)) {
          removeAssignationsIncompatibleWith(assignation);
          assignations = assignations.add(assignation);
        }
      }
    }

    return assignations;
  },
};
