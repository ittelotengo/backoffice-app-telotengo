import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid, IconButton, TextField, Switch, FormGroup, FormControlLabel } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import ButtonGeneric from "../../../components/atoms/button/ButtonGeneric";
import { createMethods, deleteMethods, detailMethods, updateMethods, } from "../../../repositories/paymentMethods.repository";
import LoaderComponent from "../../../components/atoms/loader/LoaderComponent";
import { uploadFileStorage } from "../../../repositories/banners.repository";
import FormList from "antd/es/form/FormList";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePaymentMethod() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const currentPath = window.location.pathname;

  const { id } = useParams();

  const [isCreate, setIsCreate] = useState(
    currentPath.split("/").includes("create")
  );

  const validationSchema = Yup.object().shape({
    active: Yup.boolean().required(" Campo Requerido"),
    systemCode: Yup.string().required(" Campo Requerido"),
    systemName: Yup.string().required(" Campo Requerido"),
    systemGroup: Yup.string().required(" Campo Requerido"),
    title: Yup.string().required(" Campo Requerido"),
    description: Yup.string().required(),
  });

  const initialValues = {
    active: '',
    systemCode: '',
    systemName: '',
    systemGroup: '',
    title: '',
    description: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (isCreate) {
        createMethods(values).then((resId) => {
          uploadFileStorage(file, resId, "sellers")
            .then((url) => {
              navigate("/payment-methods/list");
              setIsLoading(false);
            });
        });
      } else {
        updateMethods(id, values).then((res) => {
          navigate("/payment-methods/list");
          setIsLoading(false);
        })
      }
    },
  });

  const handleDelete = (id) => {
    setIsLoading(true);
    deleteMethods(id)
      .then((res) => {
        navigate("/payment-methods/list");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!id || isCreate) return;

    setIsLoading(true);

    detailMethods(id).then((data) => {
      formik.setFieldValue("active", data.active);
      formik.setFieldValue("systemCode", data.systemCode);
      formik.setFieldValue("systemName", data.systemName);
      formik.setFieldValue("systemGroup", data.systemGroup);
      formik.setFieldValue("title", data.title);
      formik.setFieldValue("description", data.description);
      setIsLoading(false);
    });
  }, []);


  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'direction': 'rtl' }, { 'align': ['', 'right', 'center', 'justify'] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ 'list': 'bullet' }, { 'list': 'ordered' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link'],
      ['code-block'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'align',
    'script',
    'direction',
    'list', 'bullet', 'indent',
    'link',
    'blockquote', 'code-block'
  ];


  return (
    <div className="w-full h-full mb-6">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <IconButton onClick={() => navigate("/payment-methods/list")} >
            <ArrowBackIcon />
          </IconButton>
          <h1 className="font-bold text-3xl ml-4">
            {" "}
            {isCreate ? "Crear Método de Pago" : "Editar Método de Pago"}
          </h1>
        </div>
        {!isCreate && (
          <ButtonGeneric
            type="Button"
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
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid item container sx={12} spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <FormControlLabel
                    error={formik.touched.active && Boolean(formik.errors.active)}
                    helperText={formik.touched.active && formik.errors.active}
                    control={
                      <Switch
                        type={"checkbox"}
                        key={"active"}
                        name={"active"}
                        checked={formik.values.active}
                        onChange={e => formik.setFieldValue(e.target.name, e.target.checked)}
                        onBlur={formik.handleBlur}
                      />
                    }
                    label="Activo"
                  />
                </FormGroup>
              </Grid>
            </Grid>
            <Grid item container sx={12} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type={"text"}
                  key={"title"}
                  name={"title"}
                  label="Titulo"
                  variant="outlined"
                  fullWidth
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  placeholder="Título"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type={"text"}
                  key={"systemCode"}
                  name={"systemCode"}
                  label="Código Identificador de VTEX"
                  variant="outlined"
                  fullWidth
                  value={formik.values.systemCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.systemCode && Boolean(formik.errors.systemCode)}
                  helperText={formik.touched.systemCode && formik.errors.systemCode}
                  placeholder="ID de VTEX"
                />
              </Grid>
            </Grid>
            <Grid item container sx={12} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type={"text"}
                  key={"systemName"}
                  name={"systemName"}
                  label="Nombre Identificador VTEX"
                  variant="outlined"
                  fullWidth
                  value={formik.values.systemName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.systemName && Boolean(formik.errors.systemName)}
                  helperText={formik.touched.systemName && formik.errors.systemName}
                  placeholder="Nombre de VTEX"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type={"text"}
                  key={"systemGroup"}
                  name={"systemGroup"}
                  label="Grupo Identificador de VTEX"
                  variant="outlined"
                  fullWidth
                  value={formik.values.systemGroup}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.systemGroup && Boolean(formik.errors.systemGroup)}
                  helperText={formik.touched.systemGroup && formik.errors.systemGroup}
                  placeholder="Grupo de VTEX"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormGroup
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                >
                  <ReactQuill
                    value={formik.values.description}
                    onChange={(value) => {
                      formik.setFieldValue('description', value);
                    }}
                    formats={formats}
                    modules={modules}
                    style={{ height: '30rem' }}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
          <div className="flex items-center w-full mt-20">
            <ButtonGeneric
              type="Button"
              onClick={() => navigate("/payment-methods/list")}
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

export default CreatePaymentMethod;
