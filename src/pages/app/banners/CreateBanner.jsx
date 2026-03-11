import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Grid, Select, TextField, MenuItem, InputLabel, FormControl, FormGroup, FormControlLabel, Switch } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import ButtonGeneric from "../../../components/atoms/button/ButtonGeneric";
import LoaderComponent from "../../../components/atoms/loader/LoaderComponent";
import { getSections } from "../../../repositories/sections.repository";
import { createBanner, deleteBanner, detailBanner, updateBanner } from "../../../repositories/banners.repository";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

function CreateBanner() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState([]);
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
    const storage = getStorage();
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
            updateBanner(resId, { ...values, url }).then(() => {
              navigate("/banners/list");
              setIsLoading(false);
            });
          });
        });
      } else {
        if (file) {
          handleUpload(file, id).then((url) => {
            updateBanner(id, { ...values, url }).then(() => {
              navigate("/banners/list");
              setIsLoading(false);
            });
          });
        } else {
          updateBanner(id, values).then(() => {
            navigate("/banners/list");
            setIsLoading(false);
          });
        }
      }
    },
  });

  const handleDelete = (id) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este banner? Esta acción no se puede deshacer.");
    if (!confirmed) return;

    setIsLoading(true);
    deleteBanner(id)
      .then(() => {
        navigate("/banners/list");
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
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
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#e6e5e5" }}>
      {isLoading && <LoaderComponent />}

      <div style={{ backgroundColor: "#ffffff", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <IconButton onClick={() => navigate("/banners/list")}>
            <ArrowBackIcon />
          </IconButton>
          <h1 style={{ fontWeight: "bold", fontSize: "1.5rem", margin: 0 }}>
            {isCreate ? "Crear Banner" : "Editar Banner"}
          </h1>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" justifyContent="space-between">

            <Grid item xs={12} md={6}>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", padding: "16px" }}>
                <div style={{ border: "2px dashed #d1d5db", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px", minHeight: "300px" }}>
                  {formik.values.url ? (
                    <img src={formik.values.url} alt="Uploaded" style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }} />
                  ) : (
                    <p style={{ color: "#9ca3af" }}>Sin imagen</p>
                  )}
                  <input type="file" onChange={handleChange} style={{ marginTop: "16px" }} />
                </div>
                <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "12px", marginTop: "8px" }}>
                  Dimensiones recomendadas: 1552x778px
                </p>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="canRedirect"
                        checked={formik.values.canRedirect}
                        onChange={(e) => formik.setFieldValue(e.target.name, e.target.checked)}
                        onBlur={formik.handleBlur}
                      />
                    }
                    label="Redirección Activa"
                  />
                </FormGroup>

                <FormControl fullWidth>
                  <InputLabel id="section-label">Posición</InputLabel>
                  <Select
                    labelId="section-label"
                    name="section"
                    value={formik.values.section}
                    onChange={formik.handleChange}
                    label="Posición"
                  >
                    <MenuItem value={null}></MenuItem>
                    {sections.map((section) => (
                      <MenuItem key={section?.id} value={section?.id}>
                        {section?.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  type="number"
                  name="order"
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

                <FormControl fullWidth>
                  <InputLabel>Redirección</InputLabel>
                  <Select
                    name="redirect"
                    value={formik.values.redirect}
                    onChange={formik.handleChange}
                    label="Redirección"
                  >
                    {[
                      { id: "category", label: "Vista de Categorias" },
                      { id: "collection", label: "Vista de Colección" },
                      { id: "search", label: "Vista de Búsqueda" },
                      { id: "product", label: "Vista de Producto" },
                      { id: "seller", label: "Vista de Seller" },
                    ].map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  type="text"
                  name="category"
                  label="VTEX ID"
                  variant="outlined"
                  fullWidth
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  helperText={formik.touched.category && formik.errors.category}
                  placeholder="Categoria"
                />
              </div>
            </Grid>

          </Grid>
        </form>
      </div>

      <div style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 -4px 6px -1px rgba(0,0,0,0.05)", flexShrink: 0, zIndex: 50 }}>
        <div style={{ display: "flex", gap: "24px" }}>
          <ButtonGeneric
            type="button"
            onClick={() => navigate("/banners/list")}
            text="Regresar"
            withBorder={true}
          />
          {!isCreate && (
            <ButtonGeneric
              type="button"
              onClick={() => handleDelete(id)}
              text="Eliminar"
              style={{ color: "#ef4444", border: "2px solid #ef4444", backgroundColor: "#fff" }}
            />
          )}
        </div>
        <ButtonGeneric
          type="button"
          onClick={formik.handleSubmit}
          text="Guardar Cambios"
          style={{ backgroundColor: "#3b1fa3", color: "white", padding: "10px 32px", borderRadius: "8px", fontWeight: "bold" }}
        />
      </div>

    </div>
  );
}

export default CreateBanner;