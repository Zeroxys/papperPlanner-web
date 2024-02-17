import * as Yup from "yup";

const modalReservationValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Por favor, ingresa tu nombre")
    .matches(
      /^[a-zA-Z\s]+$/,
      "El nombre no debe contener números ni caracteres especiales"
    )
    .min(4, "El nombre debe tener al menos 4 letras")
    .max(20, "El nombre no puede tener más de 20 caracteres"),
  phone: Yup.string()
    .required("Por favor, ingresa tu número de teléfono")
    .matches(/^[0-9]{10}$/, "El número de teléfono debe tener 10 dígitos"),
  email: Yup.string()
    .optional()
    .email("Por favor, ingresa un correo electrónico válido"),
  note: Yup.string()
    // .required("Por favor, agrega una nota")
    .optional()
    .min(10, "La nota debe tener al menos 10 caracteres")
    .max(255, "La nota no puede tener más de 255 caracteres"),
});

export default modalReservationValidationSchema;
