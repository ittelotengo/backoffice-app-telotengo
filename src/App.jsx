import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { SnackbarProvider } from "notistack";
import { IconButton } from "@mui/material";
import { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";


function App() {
  const snackbar = useRef();
  return (
    <SnackbarProvider
        ref={snackbar}
        action={(key) => (
          <IconButton
            aria-label="close"
            onClick={() => snackbar.current.closeSnackbar(key)}
            sx={{
              color: "#FFF",
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
      <RouterProvider router={router} />
      </SnackbarProvider>
  );
}

export default App;
