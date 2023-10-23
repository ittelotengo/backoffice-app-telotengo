import { Button } from "@mui/material";
import React from "react";
import { primary_color } from "../../../shared/colors";

const ButtonPrimary = ({
    buttonText= "Enviar",
    type="submit",
    handleClick = () => null,
    ...propsButton
}) => {
  return (
    <Button
      type={type}
      variant="contained"
      fullWidth
      onClick={handleClick}
      sx={{
        paddingTop: "10px",
        paddingBottom: "10px",
        backgroundColor: primary_color,
        textTransform: "none",
        fontFamily: "Montserrat",
        fontWeight: 500,
        fontSize: "20px",
        borderRadius: "30px",
      }}
      {...propsButton}
    >
      {buttonText}
    </Button>
  );
};

export default ButtonPrimary;
