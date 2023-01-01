import { describe, expect, it } from "vitest";
import { Desk } from "../desk";
import { Employee } from "../employee";
import { Assignations } from "./assignation";

it("empty test", () => {});

const employee = (id: number): Employee => ({
  id: id.toString(),
  name: `employee ${id}`,
  perferedDesks: [],
});

const desk = (id: number): Desk => ({ id: id.toString(), label: `desk ${id}` });

describe("assignations", () => {
  describe("validation", () => {
    it("empty assignations is valid", () => {
      new Assignations();
    });

    it("with several same employee is invalid", () => {
      expect(
        () =>
          new Assignations([
            { employee: employee(1), desk: desk(1) },
            { employee: employee(1), desk: desk(2) },
          ])
      ).toThrowError();
    });

    it("with several same desk is invalid", () => {
      expect(
        () =>
          new Assignations([
            { employee: employee(1), desk: desk(1) },
            { employee: employee(2), desk: desk(1) },
          ])
      ).toThrowError();
    });
  });
});
