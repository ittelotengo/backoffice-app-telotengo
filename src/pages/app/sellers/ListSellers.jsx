import {
    Menu,
    MenuItem,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import TableDisplay from "../../../components/organisms/table/TableDisplay";
  import MoreIconButton from "../../../components/atoms/icon/MoreIconButton";
  import { useNavigate } from "react-router-dom";
  import LoaderComponent from "../../../components/atoms/loader/LoaderComponent";
  import HeaderSection from "../../../components/molecules/header/HeaderSection";
  
  function ListSellers() {
    const [numofrecords, setNumofrecords] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [firstTime, setFirstTime] = useState(true);
    const [openOption, setOpenOption] = useState("");
    const [filters, setFilters] = useState({
      page: 0,
      limit: 5,
      order: "",
      dir: "",
      filterText: "",
    });
    const [searchFilter, setsearchFilter] = useState('')
  
    const { page, limit, order, dir, filterText } = filters;

  
    return (
      <div className="w-full h-full">
        <HeaderSection
          title="Sellers"
          textButton="Crear Comercio"
          onClickButton={() => navigation("/commerce/create")}
          setsearchFilter={setsearchFilter}
        />
  
        <div className="w-full">
          <TableDisplay
            msgEmpty="No posee comercios"
            mt={2}
            maxWidth="1200px"
            columns={[
              { id: "name", label: "Nombre", col: "name" },
              { id: "rif", label: "RIF", col: "rif" },
              { id: "email", label: "Correo", col: "email" },
              { id: "phone", label: "Teléfono", col: "phone" },
              { id: "", label: "Opciones", col: "options" },
            ]}
            data={[]}
            page={page}
            setPage={(val) =>
              setFilters((prevState) => ({
                ...prevState,
                page: val,
              }))
            }
            totalRecords={numofrecords}
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
                        id="itemCommerceDetail"
                        onClick={() => navigation(`/commerce/detail/${row.id}`)}
                        sx={{
                          paddingRight: "10px",
                          paddingLeft: '10px'
                        }}
                      >
                        {/* <VisibilityIcon
                          
                        /> */}
                        Ver
                      </MenuItem>
                      <MenuItem
                        id="itemEditCommerce"
                        onClick={() => navigation(`/commerce/update/${row.id}`)}
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
        {isLoading && <LoaderComponent />}
      </div>
    );
  }
  
  export default ListSellers;