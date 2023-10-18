import { makeStyles } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  }));