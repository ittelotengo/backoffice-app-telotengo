import { Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableDisplay from "../../../components/organisms/table/TableDisplay";
import MoreIconButton from "../../../components/atoms/icon/MoreIconButton";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../../components/atoms/loader/LoaderComponent";
import HeaderSection from "../../../components/molecules/header/HeaderSection";
import { getSellers } from "../../../repositories/sellers.repository";

function ListSellers() {
  const [numofrecords, setNumofrecords] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const [openOption, setOpenOption] = useState("");
  const [sellers, setSellers] = useState([]);
  const [filters, setFilters] = useState({
    page: 0,
    limit: 5,
    order: "",
    dir: "",
    filterText: "",
  });
  const [searchFilter, setsearchFilter] = useState("");

  const navigation = useNavigate();

  const { page, limit, order, dir, filterText } = filters;

  useEffect(() => {
    setLoading(true);
    getSellers().then((res) => {
      setSellers(res);
      setLoading(false);
    });
    
  }, []);

  return (
    <div className="w-full h-full mb-6">
      <HeaderSection
        title="Sellers"
        textButton="Crear Seller"
        onClickButton={() => navigation("/sellers/create")}
        setsearchFilter={setsearchFilter}
      />

      <div className="w-full">
        <TableDisplay
          msgEmpty="No posee sellers"
          mt={2}
          maxWidth="1200px"
          columns={[
            { id: "image", label: "Logo", col: "image" },
            { id: "name", label: "Nombre", col: "name" },

            { id: "", label: "Opciones", col: "options" },
          ]}
          data={
            searchFilter
              ? sellers.filter((item) =>
                  item.name.toLowerCase().includes(searchFilter.toLowerCase())
                )
              : sellers ?? []
          }
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
            image: {
              render: (row) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ maxWidth: "50px" }}>
                    <img
                      src={row.image}
                      alt="Descripción de la imagen"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              ),
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
                    {/* <MenuItem
                      id="itemsellersDetail"
                      onClick={() => navigation(`/sellers/detail/${row.id}`)}
                      sx={{
                        paddingRight: "10px",
                        paddingLeft: "10px",
                      }}
                    >
                      <VisibilityIcon
                          
                        />
                      Ver
                    </MenuItem> */}
                    <MenuItem
                      id="itemEditsellers"
                      onClick={() => navigation(`/sellers/update/${row.id}`)}
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
