import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import Badge from "../../atoms/badge/Badge";

const HeaderHome = ({
  title = "",
  textButton = "crear",
  onClickButton = () => null,
  setsearchFilter = () => null,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("Semana");

  const filters = ["Hoy", "Semana", "Mes", "Año", "Personalizar"];
  return (
    <div>
      <h1 className="font-bold text-3xl">{title}</h1>
      <div className="flex justify-between items-center w-2/5 mt-8">
        {filters.map((filter) => {
          return (
            <Badge
              title={filter}
              selected={selectedFilter === filter}
              setSelected={setSelectedFilter}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeaderHome;
