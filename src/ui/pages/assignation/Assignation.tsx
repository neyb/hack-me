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
  const employees = useRecoilValue(employeesSelector).map(toEmployee);
  const desks = useRecoilState(desksAtom)[0].map(toDesk);

  const calculate = () => {
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
