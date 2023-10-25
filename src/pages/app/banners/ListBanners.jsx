import { Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableDisplay from "../../../components/organisms/table/TableDisplay";
import MoreIconButton from "../../../components/atoms/icon/MoreIconButton";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../../../components/atoms/loader/LoaderComponent";
import HeaderSection from "../../../components/molecules/header/HeaderSection";
import { getBanners } from "../../../repositories/banners.repository";
import { getSections } from "../../../repositories/sections.repository";

function ListBanners() {
  const [numofrecords, setNumofrecords] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const [openOption, setOpenOption] = useState("");
  const [banners, setBanners] = useState([]);
  const [sections, setSections] = useState([]);
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
    getBanners().then((res) => {
      setBanners(res);
      getSections().then((sec) => {
        setSections(sec);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div className="w-full h-full">
      <HeaderSection
        title="Banners"
        textButton="Crear Banner"
        onClickButton={() => navigation("/banners/create")}
        setsearchFilter={setsearchFilter}
      />

      <div className="w-full">
        <TableDisplay
          msgEmpty="No posee banners"
          mt={2}
          maxWidth="1200px"
          columns={[
            { id: "url", label: "Logo", col: "url" },
            { id: "section", label: "Sección", col: "section" },
            { id: "order", label: "Orden", col: "order" },
            { id: "", label: "Opciones", col: "options" },
          ]}
          data={
            searchFilter
              ? banners
                  .filter((item) =>
                    sections.find((elem) => elem.id == item.section)?.label
                      ? sections
                          .find((elem) => elem.id == item.section)
                          ?.label.toLowerCase()
                          .includes(searchFilter.toLowerCase())
                      : item.section
                          .toLowerCase()
                          .includes(searchFilter.toLowerCase())
                  )
                  .sort((a, b) => Number(a.section) - Number(b.section))
              : banners.sort((a, b) => Number(a.section) - Number(b.section)) ??
                []
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
            url: {
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
                      src={row.url}
                      alt="Descripción de la imagen"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              ),
            },
            section: {
              render: (row) =>
                sections.find((elem) => elem.id == row.section)?.label ||
                row.section,
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
                      onClick={() => navigation(`/banners/update/${row.id}`)}
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

export default ListBanners;
