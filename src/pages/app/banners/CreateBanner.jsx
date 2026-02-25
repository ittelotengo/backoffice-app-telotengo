import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Grid, Select, TextField, MenuItem, InputLabel, FormControl, FormGroup, FormControlLabel, Switch } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import ButtonGeneric from "../../../components/atoms/button/ButtonGeneric";
import LoaderComponent from "../../../components/atoms/loader/LoaderComponent";
import { getSections } from "../../../repositories/sections.repository";
import { createBanner, deleteBanner, detailBanner, updateBanner, } from "../../../repositories/banners.repository";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

function CreateBanner() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);

  const currentPath = window.location.pathname;

  const { id } = useParams();
  const [isCreate, setIsCreate] = useState(
    currentPath.split("/").includes("create")
  );

  const validationSchema = Yup.object().shape({
    order: Yup.string().required(" Campo Requerido"),
    section: Yup.string().optional(),
    url: Yup.string().optional(),
  });

  const initialValues = {
    canRedirect: false,
    category: "",
    order: "",
    section: "",
    url: "",
    redirect: "category",
    query: "",
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      formik.setFieldValue("url", URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async (file, id) => {
    // Create a root reference
    const storage = getStorage();

    // Create a reference to 'mountains.jpg'
    const storageRef = ref(storage, `banners/${id}`);

    try {
      const uploadFile = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(uploadFile.ref);

      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (isCreate) {
        if (!file) return;
        createBanner(values).then((resId) => {
          handleUpload(file, resId).then((url) => {
            updateBanner(resId, {
              ...values,
              url,
            }).then((res) => {
              navigate("/banners/list");
              setIsLoading(false);
            });
          });
        });
      } else {
        if (file) {
          handleUpload(file, id).then((url) => {
            updateBanner(id, {
              ...values,
              url,
            }).then((res) => {
              navigate("/banners/list");
              setIsLoading(false);
            });
          });
        } else {
          updateBanner(id, values).then((res) => {
            navigate("/banners/list");
            setIsLoading(false);
          });
        }
      }
    },
  });

  const handleDelete = (id) => {
    setIsLoading(true);
    deleteBanner(id)
      .then((res) => {
        navigate("/banners/list");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSections().then((res) => setSections(res));
    if (!id || isCreate) return;
    setIsLoading(true);

    detailBanner(id).then((data) => {
      formik.setFieldValue("canRedirect", data.canRedirect);
      formik.setFieldValue("order", data.order);
      formik.setFieldValue("section", data.section);
      formik.setFieldValue("category", data.category);
      formik.setFieldValue("url", data.url);
      formik.setFieldValue("redirect", data.redirect);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full h-full mb-6">
      {isLoading && <LoaderComponent />}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center column-gap-2">
          <IconButton onClick={() => navigate("/banners/list")} >
            <ArrowBackIcon />
          </IconButton>
          <h1 className="font-bold text-2xl ml-4">
            {isCreate ? "Crear Banner" : "Editar Banner"}
          </h1>
        </div>
        {!isCreate && (
          <ButtonGeneric
            type="button"
            onClick={() => handleDelete(id)}
            text="Eliminar"
            className="w-[13%]"
            style={{
              color: "white",
            }}
          />
        )}
      </div>
      <div className="pt-6">
        <form onSubmit={formik.handleSubmit} className="w-full">
          <Grid
            container
            spacing={2}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            flexDirection={"row"}
          >
            <Grid item container sx={12} spacing={2} md={6}>
              <Grid item xs={12}>
                <div className=" px-4 border-2 border-gray-300 border-dashed flex flex-col justify-center h-full">
                  <br />
                  {formik.values.url && (
                    <img src={formik.values.url} alt="Uploaded" className="mt-4" />
                  )}
                  <br />
                  <input type="file" onChange={handleChange} className="mb-4" />
                </div>
              </Grid>
            </Grid>
            <Grid item container sx={12} spacing={2} md={6}>
              <Grid item container sx={12} spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    <FormControlLabel
                      error={formik.touched.canRedirect && Boolean(formik.errors.canRedirect)}
                      helperText={formik.touched.canRedirect && formik.errors.canRedirect}
                      control={
                        <Switch
                          type={"checkbox"}
                          key={"canRedirect"}
                          name={"canRedirect"}
                          checked={formik.values.canRedirect}
                          onChange={e => formik.setFieldValue(e.target.name, e.target.checked)}
                          onBlur={formik.handleBlur}
                        />
                      }
                      label="Redirección Activa"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="section-label">Posición</InputLabel>
                  <Select
                    labelId="section-label"
                    id={"section"}
                    value={formik.values.section}
                    onChange={formik.handleChange}
                    fullWidth
                    label='Posición'
                    name="section"
                    variant="outlined"
                  >
                    <MenuItem value={null}></MenuItem>
                    {sections.map((section) => {
                      return (
                        <MenuItem value={section?.id}>{section?.label}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  type={"number"}
                  key={"order"}
                  name={"order"}
                  label="Orden"
                  variant="outlined"
                  fullWidth
                  value={formik.values.order}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.order && Boolean(formik.errors.order)}
                  helperText={formik.touched.order && formik.errors.order}
                  placeholder="Orden del banner en la sección"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="section-label">Redirección</InputLabel>
                  <Select
                    id={"redirect"}
                    value={formik.values.redirect}
                    onChange={formik.handleChange}
                    fullWidth
                    name="redirect"
                    placeholder="Redirección"
                    label="Redirección"
                  >
                    {[
                      { id: "category", label: "Vista de Categorias" },
                      { id: "collection", label: "Vista de Colección" },
                      { id: "search", label: "Vista de Búsqueda" },
                      { id: "product", label: "Vista de Producto" },
                      { id: "seller", label: "Vista de Seller" },
                    ].map((section) => {
                      return (
                        <MenuItem value={section?.id}>{section?.label}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  type={"text"}
                  key={"category"}
                  name={"category"}
                  label={`VTEX ID`}
                  variant="outlined"
                  fullWidth
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                  helperText={formik.touched.category && formik.errors.category}
                  placeholder={"Categoria"}
                />
              </Grid>
            </Grid>
            <Grid item sx={12} className="flex items-center w-full mt-5">
              <ButtonGeneric
                type="Button"
                onClick={() => navigate("/sellers/list")}
                text="Regresar"
                withBorder={true}
              />
              <ButtonGeneric
                type="submit"
                text="Guardar"
                className="ml-6"
                style={{
                  color: "white",
                }}
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default CreateBanner;
