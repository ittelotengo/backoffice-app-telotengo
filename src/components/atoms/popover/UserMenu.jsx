import React from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const auth = getAuth();

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/auth/login");
        setAnchorEl(null);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>{"Cerrar Sesión"}</MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu;
