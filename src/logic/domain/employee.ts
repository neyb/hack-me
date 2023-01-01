import { Assignation } from "./assignation";
import { Desk } from "./desk";

export class Employee {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly preferedDesks: Desk[]
  ) {}

  equals = (other: Employee) => this.id === other.id;

  assignedTo = (desk: Desk) => new Assignation(this, desk);

  preferedAssignations = () =>
    this.preferedDesks.map((preferedDesk) => this.assignedTo(preferedDesk));
}
