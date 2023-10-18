import React, {useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, InputLabel, makeStyles, InputAdornment } from "@mui/material";
import { primary_color } from "../../../shared/colors";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function CreateForm({ config }) {
  const [visibilyPassword, setVisibilityPassword] = useState(false);
  const validationSchema = Yup.object().shape(
    Object.keys(config.fields).reduce((schema, fieldName) => {
      schema[fieldName] = config.fields[fieldName].validation || Yup.string();
      return schema;
    }, {})
  );

  const initialValues = Object.keys(config.fields).reduce(
    (values, fieldName) => {
      values[fieldName] = config.fields[fieldName].initialValue || "";
      return values;
    },
    {}
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: config.onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <Box display="flex" flexDirection="column" fullWidth>
        {Object.keys(config.fields).map((fieldName) => {
          if (fieldName === "password") {
            return (
              <div key={fieldName} className="my-2">
                <InputLabel
                  sx={{
                    color: "black",
                  }}
                >
                  {config.fields[fieldName].label || fieldName}
                </InputLabel>
                <TextField
                  type={visibilyPassword ? "text" : "password"}
                  key={"password"}
                  name={"password"}
                  label=""
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  placeholder="Contraseña"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => setVisibilityPassword(!visibilyPassword)}
                      >
                        {visibilyPassword ? <VisibilityOff /> : <Visibility />}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            );
          }
          return (
            <div key={fieldName} className="my-2">
              <InputLabel
                sx={{
                  color: "black",
                }}
              >
                {config.fields[fieldName].label || fieldName}
              </InputLabel>
              <TextField
                type={config.fields[fieldName]?.type || "text"}
                key={fieldName}
                name={fieldName}
                label=""
                variant="outlined"
                margin="normal"
                fullWidth
                value={formik.values[fieldName]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched[fieldName] && Boolean(formik.errors[fieldName])
                }
                helperText={
                  formik.touched[fieldName] && formik.errors[fieldName]
                }
                placeholder={config.fields[fieldName].label || fieldName}
              />
            </div>
          );
        })}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={formik.isSubmitting}
          sx={{
            paddingTop: "15px",
            paddingBottom: "15px",
            backgroundColor: primary_color,
            marginTop: 8
          }}
        >
          {config.submitButtonText || "Enviar"}
        </Button>
      </Box>
    </form>
  );
}

export default CreateForm;
