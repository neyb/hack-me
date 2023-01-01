import { assignationAtom } from "@/logic/infra/state/assignations";
import { useAssign } from "@/logic/infra/state/assignationsActions";
import { Box, Button } from "@mui/material";
import { useRecoilState } from "recoil";

export default function Assignation() {
  const [assignations] = useRecoilState(assignationAtom);
  const assign = useAssign();

  return (
    <Box>
      <Button onClick={assign}>calculate</Button>
      <Box>
        <div>result</div>
        {/* temporary to see a result */}
        <div>{JSON.stringify(assignations)}</div>{" "}
      </Box>
    </Box>
  );
}
