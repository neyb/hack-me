import { describe, expect, test } from "vitest";
import { Assignations } from "../assignation";
import { desk, employee } from "../assignation.test";
import { prioritizePerWish } from "./prioritizePerWish";

describe("algorithm", () => {
  const simpleInputs = () => {
    const employees = [
      employee(1, [desk(1), desk(2)]),
      employee(2, [desk(2), desk(3)]),
      employee(3, [desk(3)]),
    ];

    const desks = [desk(1), desk(2), desk(3)];

    return { employees, desks };
  };

  test.each([prioritizePerWish])(
    "%0.id simple input gives one of his first preferred desk to an employee",
    ({ run }) => {
      const { employees, desks } = simpleInputs();
      const assignations = run(employees, desks);

      // must at least contain one of employee1/desk1, employee2/desk2 or employee3/desk3
      expect(assignations).toSatisfy(
        (assignations: Assignations) =>
          assignations.assignations.some(
            employee(1).assignedTo(desk(1)).equals
          ) ||
          assignations.assignations.some(
            employee(2).assignedTo(desk(2)).equals
          ) ||
          assignations.assignations.some(employee(3).assignedTo(desk(3)).equals)
      );
    }
  );

  describe("prioritizePerWish", () => {
    test("with simple inputs", () => {
      const { employees, desks } = simpleInputs();
      const assignations = prioritizePerWish.run(employees, desks);
      const objectContaining = expect.objectContaining;

      expect(assignations.assignations).toEqual([
        objectContaining({
          employee: objectContaining({ id: "1" }),
          desk: objectContaining({ id: "1" }),
        }),
        objectContaining({
          employee: objectContaining({ id: "2" }),
          desk: objectContaining({ id: "2" }),
        }),
        objectContaining({
          employee: objectContaining({ id: "3" }),
          desk: objectContaining({ id: "3" }),
        }),
      ]);
    });

    // it really need more tests... and this algorithm is pretty dumb...

    // maybe sorting by number of wish could improve it a bit... but it would be a different algo...
  });
});
