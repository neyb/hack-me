import { AppBar, Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const navigate = useNavigate();

  const pages = [
    { label: "desks", link: "/desk" },
    { label: "employees", link: "/employee" },
    { label: "Desk assignation", link: "/assignation" },
  ];

  return (
    <AppBar>
      <Toolbar>
        {pages.map(({ label, link }) => (
          <Button
            key={label}
            sx={{ my: 2, color: "white", display: "block" }}
            onClick={() => navigate(link)}
          >
            {label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};
