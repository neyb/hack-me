import {
  EmployeeComputed,
  employeesSelector,
} from "@/logic/infra/state/employeeComputed";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRecoilValue } from "recoil";

const EmployeeRow = ({ employee }: { employee: EmployeeComputed }) => (
  <TableRow>
    <TableCell>{employee.id}</TableCell>
    <TableCell>{employee.name}</TableCell>
    <TableCell>
      {employee.preferedDesks.map((desk) => desk.label).join(", ")}
    </TableCell>
  </TableRow>
);

const Head = () => (
  <TableHead>
    <TableRow>
      <TableCell>id</TableCell>
      <TableCell>name</TableCell>
      <TableCell>desks</TableCell>
    </TableRow>
  </TableHead>
);
export default function Employees() {
  const employees = useRecoilValue(employeesSelector);

  return (
    <Box>
      <TableContainer>
        <Table>
          <Head />
          <TableBody>
            {employees.map((employee) => (
              <EmployeeRow employee={employee} key={employee.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
