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
import {
  createSeller,
  detailSeller,
  updateSeller,
} from "../../../repositories/sellers.repository";
import LoaderComponent from "../../../components/atoms/loader/LoaderComponent";
import { getSections } from "../../../repositories/sections.repository";
import { detailBanner } from "../../../repositories/banners.repository";
import { storage } from "../../../../firebaseConfig";

function CreateBanner() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState({});

  const currentPath = window.location.pathname;

  const { id } = useParams();
  const [isCreate, setIsCreate] = useState(["create"].includes(currentPath));

  const validationSchema = Yup.object().shape({
    order: Yup.string().required(" Campo Requerido"),
    section: Yup.string().required(" Campo Requerido"),
    url: Yup.string().required(" Campo Requerido"),
  });

  const initialValues = {
    category: "",
    order: "",
    section: "",
    url: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (isCreate) {
        createSeller(values).then((res) => {
          navigate("/banners/list");
          setIsLoading(false);
        });
      } else {
        updateSeller(id, values).then((res) => {
          navigate("/banners/list");
          setIsLoading(false);
        });
      }
    },
  });

  useEffect(() => {
    getSections().then((res) => setSections(res));
    if (!id || isCreate) return;
    setIsLoading(true);

    detailBanner(id).then((data) => {
      formik.setFieldValue("order", data.order);
      formik.setFieldValue("section", data.section);
      formik.setFieldValue("category", data.category);
      formik.setFieldValue("url", data.url);
      setIsLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      formik.setFieldValue("url", URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = (image) => {
    const uploadTask = storage.ref(`banners/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Progreso de la carga
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        // Manejo de errores
        console.log(error);
      },
      () => {
        // Completa la carga exitosamente
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log("URL", url)
            return url
          });
      }
    );
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center">
        <IconButton
          // className={styles.backBtn}
          onClick={() => navigate("/banners/list")}
        >
          <ArrowBackIcon />
        </IconButton>
        <h1 className="font-bold text-3xl ml-4"> Crear Banner</h1>
      </div>

      <div className="pt-6">
        <form onSubmit={formik.handleSubmit} className="w-full">
          <Grid
            container
            spacing={2}
            // alignItems={"center"}
            justifyContent={"space-between"}
            flexDirection={"row"}
          >
            <Grid item container sx={6} spacing={2} xs={6}>
              <Grid item xs={12}>
                <div className=" px-4 border-2 border-gray-300 border-dashed flex flex-col justify-center h-full">
                    {/* <progress value={progress} max="100" className="w-full" /> */}
                  <br />
                  {formik.values.url && (
                    <img
                      src={formik.values.url}
                      alt="Uploaded"
                      className="mt-4"
                    />
                  )}
                  <br />
                  <input type="file" onChange={handleChange} className="mb-4" />
                </div>
              </Grid>
            </Grid>
            <Grid item container sx={12} spacing={2} xs={6}>
              <Grid item xs={12}>
                <Select
                  id={"rif_type"}
                  value={formik.values.section}
                  onChange={formik.handleChange}
                  fullWidth
                  name="rif_type"
                >
                  {sections.map((section) => {
                    return (
                      <MenuItem value={section?.id}>{section?.label}</MenuItem>
                    );
                  })}
                </Select>
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
                <TextField
                  type={"text"}
                  key={"category"}
                  name={"category"}
                  label="Categoria"
                  variant="outlined"
                  fullWidth
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                  helperText={formik.touched.category && formik.errors.category}
                  placeholder="Categoria"
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

export default CreateBanner;
