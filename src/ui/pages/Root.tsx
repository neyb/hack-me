import { TopBar } from "@/ui/common/layout/TopBar";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export const Root = () => (
  <Container>
    <TopBar />
    <Outlet />
  </Container>
);
