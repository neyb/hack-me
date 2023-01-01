import { Desk } from "@/logic/domain/desk";
import { atom } from "recoil";

export type DeskState = {
  id: string;
  label: string;
};

export const toDesk = ({ id, label }: DeskState) => new Desk(id, label);

export const desksAtom = atom({
  key: "desks",
  default: [
    { id: "1", label: "desk 1" },
    { id: "2", label: "desk 2" },
    { id: "3", label: "desk 3" },
    { id: "4", label: "desk 4" },
  ] as DeskState[],
});
