import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { LogoTitleWhite } from "../../../assets/svg/logo/LogoTitleWhite";
import UserMenu from "../../atoms/popover/UserMenu";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { primary_color } from "../../../shared/colors";

export default function HeaderNav() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { Header } = Layout;

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Header sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          background:
            primary_color,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <LogoTitleWhite
              sx={{
                width: "15rem",
                height: "2.5em"
              }}
            />
          </div>
          <UserMenu />  
        </Toolbar>
      </AppBar>
    </Header>
  );
}
