import { prioritizePerWish } from "@/logic/domain/assignation/assignation";
import {
  assignationAtom,
  State as AssignationState,
} from "@/logic/infra/state/assignations";
import { desksAtom, toDesk } from "@/logic/infra/state/desksState";
import {
  employeesSelector,
  toEmployee,
} from "@/logic/infra/state/employeeComputed";
import { Box, Button } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";

const useAssignations = () => {
  const [assignations, setAssignations] = useRecoilState(assignationAtom);
  // Having no "actions" in recoil make us use setter in component :
  // so we need to get all dependencies for the computation...
  // TODO see if we can split things here
  const employeesComputed = useRecoilValue(employeesSelector);
  const [desksComputed] = useRecoilState(desksAtom);

  const calculate = () => {
    const employees = employeesComputed.map(toEmployee);
    const desks = desksComputed.map(toDesk);
    const assignations = prioritizePerWish.find(employees, desks);
    const state: AssignationState.Assignation[] = assignations.assignations.map(
      (assignation) => AssignationState.fromAssignation(assignation)
    );
    setAssignations(state);
  };

  return { assignations, calculate };
};

export default function Assignation() {
  const { assignations, calculate } = useAssignations();
  return (
    <Box>
      <Button
        onClick={() => {
          calculate();
        }}
      >
        calculate
      </Button>
      <Box>
        <div>result</div>
        {/* temporary to see a result */}
        <div>{JSON.stringify(assignations)}</div>{" "}
      </Box>
    </Box>
  );
}
