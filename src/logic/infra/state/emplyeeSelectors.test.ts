import { describe, expect, test } from "vitest";
import { computeEmployee } from "./employeeComputed";
import { EmployeeState } from "./employeesState";

describe("employees", () => {
  describe("mapping", () => {
    test("computing a simple employee should be fine", () => {
      const employeeState: EmployeeState = {
        id: "1",
        name: "employee 1",
        preferedDesksIds: ["1"],
      };

      const desks = [{ id: "1", label: "desk 1" }];

      expect(computeEmployee(desks)(employeeState)).toMatchObject({
        id: "1",
        name: "employee 1",
        preferedDesks: [desks[0]],
      });
    });
  });
});
