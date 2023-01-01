import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TopBar } from "@/ui/common/layout/TopBar";

export const Root = () => (
  <Container>
    <TopBar />
    <Outlet />
  </Container>
);
