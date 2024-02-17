import React from "react";
import { useFormik } from "formik";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
  Box,
} from "@mui/material";
import { css } from "@emotion/react";
import colors from "../../utils/colors";

const Form = ({ validationSchema, onSubmit, inputProps }) => {
  const formik = useFormik({
    initialValues: Object.keys(validationSchema.fields).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {}),
    validationSchema,
    onSubmit,
  });

  const renderFormFields = () => {
    return Object.keys(validationSchema.fields).map((fieldName) => {
      const fieldSchema = validationSchema.fields[fieldName];
      return (
        <FormControl
          key={fieldName}
          fullWidth
          variant="outlined"
          error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
        >
          <InputLabel htmlFor={fieldName}>
            {inputProps[fieldName]?.label}
          </InputLabel>
          <OutlinedInput
            id={fieldName}
            name={fieldName}
            type={fieldSchema.type || "text"}
            value={formik.values[fieldName]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            endAdornment={inputProps[fieldName]?.startAdornment || null}
            label={inputProps[fieldName]?.label}
            sx={{
              "& fieldset": { borderColor: "purple" },
              "&:focus fieldset": { borderColor: "purple" },
            }}
          />
          <FormHelperText>
            {formik.touched[fieldName] && formik.errors[fieldName]}
          </FormHelperText>
        </FormControl>
      );
    });
  };

  return (
    <form css={styles.formStyles}>
      <Box css={styles.formsContainer}>{renderFormFields()}</Box>

      <Button
        disabled={!formik.isValid}
        variant="contained"
        css={styles.buttonStyles}
        onClick={() => formik.handleSubmit()}
      >
        Reservar
      </Button>
    </form>
  );
};

const styles = {
  formStyles: css`
    display: flex;
    flex: 0.8;
    width: 80%;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
  `,
  formsContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
  `,
  buttonStyles: css`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: ${colors.darkpink};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:disabled {
      background-color: ${colors.violet};
      color: ${colors.white};
      cursor: not-allowed;
    }
    &:hover {
      background-color: ${colors.purple};
      color: ${colors.white};
      cursor: pointer;
    }
  `,
};

export default Form;
