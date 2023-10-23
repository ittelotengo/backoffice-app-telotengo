import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { CommerceIcon } from "../../../assets/svg/menu/Commerce";
import { HomeIcon } from "../../../assets/svg/menu/Home";
import { UserIcon } from "../../../assets/svg/menu/User";
import { ReportIcon } from "../../../assets/svg/menu/Report";
import { Collapse } from "@mui/material";

const drawerWidth = 360;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function DrawerNav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const [openCollapse, setOpenCallapse] = React.useState("");

  const { pathname } = useLocation();

  return (
    <List>
      {[
        {
          text: "Banners",
          id: "banners",
          to: "/",
          icon: <HomeIcon />,
        },
        {
          text: "Sellers",
          id: "sellers",
          to: "/sellers/list",
          icon: (
            <CommerceIcon
              color={pathname.includes("sellers") ? "#5528E3" : "#747576"}
            />
          ),
        },
      ].map((item, index) => (
        <ListItem key={item.text} sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={() => {
              if (!item?.childrens) return navigate(item.to);
              setOpenCallapse(openCollapse === item.id ? "" : item.id);
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                opacity: open ? 1 : 0,
                color: pathname.includes(item.id) || openCollapse ===  item.id ? "#5528E3" : "#747576",
              }}
              onClick={() => null}
            />
          </ListItemButton>
          {item?.childrens && (
            <Collapse
              in={item.id === openCollapse}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {item?.childrens.map((elem) => {
                  return (
                    <ListItemButton sx={{
                      // minHeight: 48,
                      justifyContent: "initial",
                      // px: 2.5,
                      pl: 4
                    }}
                    onClick={() => navigate(elem.to)}
                    >
                      <ListItemText
                        primary={elem.text}
                        sx={{
                          opacity: 1,
                          color: pathname.includes(elem.id)
                            ? "#5528E3"
                            : "#747576",
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default DrawerNav;
