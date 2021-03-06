const errorMessages = {
  emailNotRegistered: "Aucun compte enregistré avec cet email.",
  invalidCredentials: "Combinaison e-mail mot de passe invalide.",
  suspendedAccount: "Votre compte a été suspendu, veuillez consulter votre e-mail pour plus de détails.",
  fieldRequired: (fieldName) => `${fieldName} est un champ requis.`,
  invalidLocation: "Veuillez reselectionner votre adresse.",
  invalidEmail: "Veuillez vérifier le format de votre email.",
  invalidMobile: "Veuillez vérifier le format de votre numéro de téléphone.",
  passwordTooShort: "Votre mot de passe est trop court.",
  passwordTooLong: "Votre mot de passe est trop long.",
  avatarRequired: "Veuillez joindre une photo de profile.",
  invalidResetCode: "Code de réinisialisation invalide.",
  invalidResetToken: "Votre token de réinisialisation est invalide.",
  resetTokenExpired: "Votre token de réinisialisation a expiré.",
};
export default errorMessages;
