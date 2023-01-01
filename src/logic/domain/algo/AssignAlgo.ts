import { Desk } from "../desk";
import { Employee } from "../employee";
import { Assignations } from "../assignation";

export type AssignAlgo = {
  id: string;
  run: (employees: Employee[], desks: Desk[]) => Assignations;
};
