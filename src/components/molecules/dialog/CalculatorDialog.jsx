import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Typography, InputAdornment, Grid } from "@mui/material";

const CalculatorDialog = ({
  open = false,
  onClose = () => null,
  onSubmit = () => null,
  price = 374525,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("");
  }, [open]);

  return (
    <Dialog open={open}>
      <DialogContent
        style={{
          display: "inline-flex",
          padding: "2.5rem 1.25rem 1.25rem 1.25rem",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "35rem",
          /*      gap: "0.25rem", */
          borderRadius: "0.5rem",
          // background: theme.palette.background.paper,
        }}
      >
        <DialogTitle>
          <Typography variant="h1" color={"primary"}>
            {"Tasa de cambio"}
          </Typography>
        </DialogTitle>

        <DialogContentText
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1" align="center">
            {"Monto actual"}
          </Typography>
          <Typography
            variant="h1"
            color={"primary"}
            style={{ marginTop: "10px" }}
          >
            {Number(price) + " Bs"}
          </Typography>
        </DialogContentText>

        <br />

        <Grid
          container
          spacing={1}
          sx={12}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={8}>
            <TextField
              type="number"
              key={"amount"}
              name={"amount"}
              label="Monto equivalente a 1 USD"
              variant="outlined"
              fullWidth
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Bs</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <br />
        <DialogActions
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <button
            className="bg-transparent px-2 py-2 rounded-md h-full w-2/4 border-2 border-primary text-primary"
            onClick={() => onClose()}
          >
            Cancelar
          </button>
          <button
            className="bg-primary px-2 py-2 rounded-md h-full w-2/4 border-2 border-primary"
            onClick={() => onSubmit(value)}
            style={{
              color: "#FFFFFF",
            }}
          >
            Guardar
          </button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorDialog;
