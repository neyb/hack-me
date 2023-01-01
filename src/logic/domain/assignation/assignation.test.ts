import memoize from "lodash/memoize";
import { beforeEach, describe, expect, it, test } from "vitest";
import { Desk } from "../desk";
import { Employee } from "../employee";
import { Assignations, prioritizePerWish } from "./assignation";

it("empty test", () => {});

const employee = memoize(
  (id: number, perferedDesks: Desk[] = []) =>
    new Employee(id.toString(), `employee ${id}`, perferedDesks)
);

const desk = memoize((id: number) => new Desk(id.toString(), `desk ${id}`));

beforeEach(() => {
  employee.cache.clear?.();
  desk.cache.clear?.();
});

describe("assignations", () => {
  describe("validation", () => {
    it("empty assignations is valid", () => {
      new Assignations();
    });

    it("with several same employee is invalid", () => {
      expect(
        () =>
          new Assignations([
            employee(1).assignedTo(desk(1)),
            employee(1).assignedTo(desk(2)),
          ])
      ).toThrowError();
    });

    it("with several same desk is invalid", () => {
      expect(
        () =>
          new Assignations([
            employee(1).assignedTo(desk(1)),
            employee(2).assignedTo(desk(1)),
          ])
      ).toThrowError();
    });
  });

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
      "%id simple input gives one of his first preferred desk to an employee",
      ({ id, run: run }) => {
        const { employees, desks } = simpleInputs();
        const assignations = run(employees, desks);

        expect(assignations).toSatisfy(
          (assignations: Assignations) =>
            assignations.assignations.some(
              employee(1).assignedTo(desk(1)).equals
            ) ||
            assignations.assignations.some(
              employee(2).assignedTo(desk(2)).equals
            ) ||
            assignations.assignations.some(
              employee(3).assignedTo(desk(3)).equals
            )
        );
      }
    );

    describe("prioritizePerWish", () => {
      test("with simple inputs", () => {
        const { employees, desks } = simpleInputs();
        const assignations = prioritizePerWish.run(employees, desks);
        const { objectContaining } = expect;

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
    });
  });

  test("empty assignations can take an assignation", () => {
    const assignations = new Assignations();
    expect(assignations.canTake(employee(1).assignedTo(desk(1)))).toBe(true);
  });
});
