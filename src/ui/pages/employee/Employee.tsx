import { useParams } from "react-router-dom"

export default function Employee(){
  const {employeeId} = useParams();
  
  return <div>employee with id {employeeId}</div>
}