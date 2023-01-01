import memoize from "lodash/memoize";
import { beforeEach, describe, expect, it, test } from "vitest";
import { Desk } from "./desk";
import { Employee } from "./employee";
import { Assignations } from "./assignation";
import { prioritizePerWish } from "./algo/prioritizePerWish";

it("empty test", () => {});

export const employee = memoize(
  (id: number, perferedDesks: Desk[] = []) =>
    new Employee(id.toString(), `employee ${id}`, perferedDesks)
);

export const desk = memoize(
  (id: number) => new Desk(id.toString(), `desk ${id}`)
);

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

  test("empty assignations can take an assignation", () => {
    const assignations = new Assignations();
    expect(assignations.canTake(employee(1).assignedTo(desk(1)))).toBe(true);
  });
});
