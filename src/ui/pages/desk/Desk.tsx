import { useParams } from "react-router-dom"

export default function Desk(){
  let deskId = useParams().deskId;
  
  return <div> desk with id : {deskId}</div>
}