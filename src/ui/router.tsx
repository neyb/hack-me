import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Desk from "./pages/desk/Desk";
import Desks from "./pages/desks/Desks";
import Employee from "./pages/employee/Employee";
import Employees from "./pages/employees/Employees";
import ErrorPage from "./pages/error/ErrorPage";
import { Root } from "./pages/Root";

export const createRouter = () => createBrowserRouter([
  {
    path: "/",
    element:<Root/>,
    errorElement:<ErrorPage/>,
    children:  [
      {
        path: "desk",
        element: <Desks/>
      },
      {
        path: "desk/:deskId",
        element: <Desk/>
      },
      {
        path: "employee",
        element: <Employees/>
      },
      {
        path: "employee/:employeeId",
        element: <Employee/>
      }
    ]
  }
])