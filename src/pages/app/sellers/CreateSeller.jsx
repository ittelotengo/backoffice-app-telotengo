import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Grid,
  IconButton,
  TextField,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import ButtonGeneric from "../../../components/atoms/button/ButtonGeneric";
import {
  createSeller,
  deleteSeller,
  detailSeller,
  updateSeller,
} from "../../../repositories/sellers.repository";
import LoaderComponent from "../../../components/atoms/loader/LoaderComponent";
import { uploadFileStorage } from "../../../repositories/banners.repository";

function CreateSeller() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const currentPath = window.location.pathname;
  const { id } = useParams();
  const [isCreate, setIsCreate] = useState(
    currentPath.split("/").includes("create")
  );

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      formik.setFieldValue("image", URL.createObjectURL(e.target.files[0]));
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" Campo Requerido"),
    key: Yup.string().required(" Campo Requerido"),
    custom_key: Yup.string(),
    token: Yup.string().required(" Campo Requerido"),
    image: Yup.string().required(" Campo Requerido"),
  });

  const initialValues = {
    name: "",
    key: "",
    custom_key: "",
    token: "",
    image: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (isCreate) {
        if (!file) return;
        createSeller(values).then((resId) => {
          uploadFileStorage(file, resId, "sellers").then((url) => {
            updateSeller(resId, { ...values, image: url }).then(() => {
              navigate("/sellers/list");
              setIsLoading(false);
            });
          });
        });
      } else {
        if (file) {
          uploadFileStorage(file, id, "sellers").then((url) => {
            updateSeller(id, { ...values, image: url }).then(() => {
              navigate("/sellers/list");
              setIsLoading(false);
            });
          });
        } else {
          updateSeller(id, values).then(() => {
            navigate("/sellers/list");
            setIsLoading(false);
          });
        }
      }
    },
  });

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este seller? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;

    setIsLoading(true);
    deleteSeller(id)
      .then(() => {
        navigate("/sellers/list");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!id || isCreate) return;
    setIsLoading(true);
    detailSeller(id).then((data) => {
      formik.setFieldValue("name", data.name);
      formik.setFieldValue("key", data.key);
      formik.setFieldValue("custom_key", data.custom_key);
      formik.setFieldValue("token", data.token);
      formik.setFieldValue("image", data.image);
      setIsLoading(false);
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#e6e5e5" }}>
      {isLoading && <LoaderComponent />}

      {/* Header bar */}
      <div style={{ backgroundColor: "#ffffff", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <IconButton onClick={() => navigate("/sellers/list")}>
            <ArrowBackIcon />
          </IconButton>
          <h1 style={{ fontWeight: "bold", fontSize: "1.5rem", margin: 0 }}>
            {isCreate ? "Crear Seller" : "Editar Seller"}
          </h1>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3} alignItems="flex-start" justifyContent="space-between">

            {/* Logo card (left) */}
            <Grid item xs={12} md={6}>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", padding: "16px" }}>
                <h2 style={{ fontWeight: "bold", fontSize: "1.1rem", margin: "0 0 12px 0" }}>Logo del Seller</h2>
                <div style={{ border: "2px dashed #d1d5db", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px", minHeight: "300px" }}>
                  {formik.values.image ? (
                    <img src={formik.values.image} alt="Uploaded" style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }} />
                  ) : (
                    <p style={{ color: "#9ca3af" }}>Sin imagen</p>
                  )}
                  <input type="file" onChange={handleChange} style={{ marginTop: "16px" }} />
                </div>
                {formik.errors["image"] && formik.touched["image"] && (
                  <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: "8px" }}>
                    {formik.errors["image"]}
                  </p>
                )}
              </div>
            </Grid>

            {/* Fields card (right) */}
            <Grid item xs={12} md={6}>
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <TextField
                  type="text"
                  name="name"
                  label="Nombre del Seller"
                  variant="outlined"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  placeholder="Nombre del Seller"
                />
                <TextField
                  type="text"
                  name="key"
                  label="Key del Seller"
                  variant="outlined"
                  fullWidth
                  value={formik.values.key}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.key && Boolean(formik.errors.key)}
                  helperText={formik.touched.key && formik.errors.key}
                  placeholder="Key del Seller"
                />
                <TextField
                  type="text"
                  name="custom_key"
                  label="Seller VTEX ID"
                  variant="outlined"
                  fullWidth
                  value={formik.values.custom_key}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.custom_key && Boolean(formik.errors.custom_key)}
                  helperText={formik.touched.custom_key && formik.errors.custom_key}
                  placeholder="Seller VTEX ID"
                />
                <TextField
                  type="text"
                  name="token"
                  label="Token del Seller"
                  variant="outlined"
                  fullWidth
                  value={formik.values.token}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.token && Boolean(formik.errors.token)}
                  helperText={formik.touched.token && formik.errors.token}
                  placeholder="Token del Seller"
                  multiline
                  rows={4}
                />
              </div>
            </Grid>

          </Grid>
        </form>
      </div>

      {/* Sticky footer */}
      <div style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 -4px 6px -1px rgba(0,0,0,0.05)", flexShrink: 0, zIndex: 50 }}>
        <div style={{ display: "flex", gap: "24px" }}>
          <ButtonGeneric
            type="button"
            onClick={() => navigate("/sellers/list")}
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

export default CreateSeller;