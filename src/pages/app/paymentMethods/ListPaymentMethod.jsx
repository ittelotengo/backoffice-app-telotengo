import { Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableDisplay from "../../../components/organisms/table/TableDisplay";
import MoreIconButton from "../../../components/atoms/icon/MoreIconButton";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../../components/atoms/loader/LoaderComponent";
import HeaderSection from "../../../components/molecules/header/HeaderSection";
import { getMethods } from "../../../repositories/paymentMethods.repository";

function ListPaymentMethod() {
  const [numOfRecords, setNumOfRecords] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const [openOption, setOpenOption] = useState("");
  const [methods, setMethods] = useState([]);
  const [filters, setFilters] = useState({
    page: 0,
    limit: 5,
    order: "",
    dir: "",
    filterText: "",
  });
  const [searchFilter, setSearchFilter] = useState("");

  const navigation = useNavigate();

  const { page, limit, order, dir, filterText } = filters;

  useEffect(() => {
    setLoading(true);
    getMethods().then((res) => {
      setMethods(res);
      setLoading(false);
    });

  }, []);

  return (
    <div className="w-full h-full mb-6">
      <HeaderSection
        title="Métodos de Pago"
        textButton="Crear Método"
        onClickButton={() => navigation("/payment-methods/create")}
        setsearchFilter={setSearchFilter}
      />
      <div className="w-full">
        <TableDisplay
          msgEmpty="No posee métodos"
          mt={2}
          maxWidth="1200px"
          columns={[
            { id: "title", label: "Título", col: "title" },
            { id: "code", label: "Código VTEX", col: "systemCode" },
            { id: "active", label: "Activo", col: "active" },
            { id: "", label: "Opciones", col: "options" },
          ]}
          data={
            searchFilter
              ? methods.filter((item) =>
                item.title.toLowerCase().includes(searchFilter.toLowerCase())
              )
              : methods ?? []
          }
          page={page}
          setPage={(val) =>
            setFilters((prevState) => ({
              ...prevState,
              page: val,
            }))
          }
          totalRecords={numOfRecords}
          limit={limit}
          setLimit={(val) =>
            setFilters((prevState) => ({
              ...prevState,
              limit: val,
              page: 0,
            }))
          }
          setOrderMain={({ dir, by }) =>
            setFilters((prevState) => ({
              ...prevState,
              order: by,
              dir: dir,
              page: 0,
            }))
          }
          customCol={{
            active: {
              render: (row) => (
                <span>{row.active ? 'Si' : 'No'}</span>
              )
            },
            options: {
              render: (row) => (
                <>
                  <MoreIconButton
                    anchorEl={anchorEl}
                    ariaControls={`option-menu-${row.id}`}
                    setAnchorEl={(val) => {
                      setAnchorEl(val);
                      setOpenOption(row.id);
                    }}
                  />
                  <Menu
                    id={`option-menu-${row.id}`}
                    MenuListProps={{
                      "aria-labelledby": "option-button",
                    }}
                    anchorEl={anchorEl}
                    open={row.id === openOption}
                    onClose={() => {
                      setAnchorEl(null);
                      setOpenOption("");
                    }}
                  >
                    <MenuItem
                      id="itemEditsellers"
                      onClick={() => navigation(`/payment-methods/update/${row.id}`)}
                    >
                      {/* <EditIcon /> */}
                      Editar
                    </MenuItem>
                  </Menu>
                </>
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default ListPaymentMethod;
