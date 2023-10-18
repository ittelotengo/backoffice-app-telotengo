import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const HeaderSection = ({
    title = "",
    textButton = 'crear',
    onClickButton = () => null,
    setsearchFilter = () => null
}) => {
  return (
    <div>
      <h1 className="font-bold text-3xl">{title}</h1>
      <div className="flex justify-between items-center py-10 w-full ">
        <TextField
          id="search"
          type="search"
          sx={{
            width: "40%",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Buscar..."
          onChange={(event) => setsearchFilter(event.target.value)}
        />
        <button
          className="bg-primary px-4 py-4 rounded-sm h-full w-1/5"
          onClick={onClickButton}
          style={{
            color: "#FFFFFF"
          }}
        >
          {textButton}
        </button>
      </div>
    </div>
  );
};

export default HeaderSection;
