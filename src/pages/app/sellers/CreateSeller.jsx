import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import ButtonGeneric from "../../../components/atoms/button/ButtonGeneric";
import { createSeller, detailSeller, updateSeller } from "../../../repositories/sellers.repository";
import LoaderComponent from "../../../components/atoms/loader/LoaderComponent";

function CreateSeller() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const currentPath = window.location.pathname;

  const { id } = useParams()
  const [isCreate, setIsCreate] = useState(["create"].includes(currentPath));

  

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" Campo Requerido"),
    key: Yup.string().required(" Campo Requerido"),
    token: Yup.string().required(" Campo Requerido"),
  });

  const initialValues = {
    name: "",
    key: "",
    token: "",
    image: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      if (isCreate) {
        createSeller(values).then((res) => {
          navigate("/sellers/list");
          setIsLoading(false)
        });
      } else {
        updateSeller(id, values).then((res) => {
          navigate("/sellers/list");
          setIsLoading(false)
        });
      }
      
    },
  });
  
  useEffect(() => {
    if (!id || isCreate) return
    setIsLoading(true)
    detailSeller(id).then(data => {
      formik.setFieldValue("name", data.name);
      formik.setFieldValue("key", data.key);
      formik.setFieldValue("token", data.token);
      formik.setFieldValue("image", data.image);
      setIsLoading(false)
    })
  }, [])
  

  return (
    <div className="w-full h-full">
      <div className="flex items-center">
        <IconButton
          // className={styles.backBtn}
          onClick={() => navigate("/sellers/list")}
        >
          <ArrowBackIcon />
        </IconButton>
        <h1 className="font-bold text-3xl ml-4"> Crear Seller</h1>
      </div>

      <div className="pt-6">
        <form onSubmit={formik.handleSubmit} className="w-full">
          <Grid
            container
            spacing={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid item container sx={12} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type={"text"}
                  key={"name"}
                  name={"name"}
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type={"text"}
                  key={"key"}
                  name={"key"}
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
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  type={"text"}
                  key={"token"}
                  name={"token"}
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
                  rows={6}
                />
              </Grid>
            </Grid>
          </Grid>

          <div className="flex items-center w-full mt-10">
            <ButtonGeneric
              type="Button"
              onClick={() => navigate("/sellers/list")}
              text="Regresar"
              className="w-[13%]"
              withBorder={true}
            />
            <ButtonGeneric
              type="submit"
              text="Guardar"
              className="ml-6 w-[13%]"
              style={{
                color: "white",
              }}
            />
          </div>
        </form>
      </div>
      {isLoading && <LoaderComponent />}
    </div>
  );
}

export default CreateSeller;
