import PhoneNumber from "awesome-phonenumber";
import { validate as validateEmail } from "email-validator";
import { mixed, number, object, string } from "yup";
import errorMessages from "../errorMessages";
const signupSchema = () => {
  const {
    fieldRequired,
    invalidEmail,
    invalidMobile,
    passwordTooShort,
    passwordTooLong,
    avatarRequired,
    invalidLocation,
  } = errorMessages;
  return object().shape({
    firstName: string().required(fieldRequired("Le prénom")),
    lastName: string().required(fieldRequired("Le nom")),
    mainPosition: string().required(fieldRequired("La position du joueur")),
    email: string()
      .required(fieldRequired("L'email"))
      .test("ValidationError", invalidEmail, (value) => validateEmail(value)),
    mobile: string()
      .required(fieldRequired("Le numéro de téléphone"))
      .test("ValidationError", invalidMobile, (v) => {
        const pn = new PhoneNumber(v);
        return pn.isValid();
      }),
    password: string().required(fieldRequired("Le mot de passe")).min(6, passwordTooShort).max(25, passwordTooLong),
    avatar: mixed().test("ValidationError", avatarRequired, async (v) => {
      try {
        const res = await v;
        return res && res.mimetype && res.mimetype.startsWith("image");
      } catch (e) {
        return false;
      }
    }),
    city: string().required(fieldRequired("La ville")),
    address: string().required(fieldRequired("L'adresse")),
    location: object()
      .shape({
        lat: number().required(invalidLocation),
        lng: number().required(invalidLocation),
      })
      .required(invalidLocation),
  });
};

export default signupSchema;
