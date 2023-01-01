import { Desk } from "./desk";

export type Employee = {
  id: string;
  name: string;
  perferedDesks: Desk[];
};
