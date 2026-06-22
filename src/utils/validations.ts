/**
 * Validaciones para el formulario de solicitudes
 */

// Validar que un campo no esté vacío
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

// Validar teléfono peruano (9 dígitos)
export const validatePhone = (value: string): boolean => {
  return /^[0-9]{9}$/.test(value.trim());
};

// Validar email
export const validateEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim());
};

// Validar que sea un número
export const validateNumber = (value: string): boolean => {
  return /^[0-9]+$/.test(value.trim());
};

// Validar longitud mínima
export const validateMinLength = (
  value: string,
  minLength: number,
): boolean => {
  return value.trim().length >= minLength;
};

// Validar longitud máxima
export const validateMaxLength = (
  value: string,
  maxLength: number,
): boolean => {
  return value.trim().length <= maxLength;
};

// Validar que solo contenga letras y espacios
export const validateOnlyLetters = (value: string): boolean => {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim());
};

// Validar DNI peruano (8 dígitos)
export const validateDNI = (value: string): boolean => {
  return /^[0-9]{8}$/.test(value.trim());
};

// Validar RUC peruano (11 dígitos)
export const validateRUC = (value: string): boolean => {
  return /^[0-9]{11}$/.test(value.trim());
};

// Validar fecha (formato YYYY-MM-DD)
export const validateDate = (value: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}$/.test(value.trim());
};

// Validar que el valor sea una opción válida
export const validateOption = (value: string, options: string[]): boolean => {
  return options.includes(value);
};

// Objeto con mensajes de error predefinidos
export const ERROR_MESSAGES = {
  required: "Este campo es requerido",
  phone: "Ingresa un teléfono válido (9 dígitos)",
  email: "Ingresa un email válido",
  number: "Ingresa solo números",
  minLength: (min: number) => `Mínimo ${min} caracteres`,
  maxLength: (max: number) => `Máximo ${max} caracteres`,
  onlyLetters: "Solo se permiten letras",
  dni: "Ingresa un DNI válido (8 dígitos)",
  ruc: "Ingresa un RUC válido (11 dígitos)",
  date: "Ingresa una fecha válida (YYYY-MM-DD)",
  invalidOption: "Selecciona una opción válida",
};

// Función para validar un campo específico con mensaje personalizado
export const validateField = (
  value: string,
  rules: {
    required?: boolean;
    phone?: boolean;
    email?: boolean;
    number?: boolean;
    minLength?: number;
    maxLength?: number;
    onlyLetters?: boolean;
    dni?: boolean;
    ruc?: boolean;
    date?: boolean;
  },
): string | null => {
  if (rules.required && !validateRequired(value)) {
    return ERROR_MESSAGES.required;
  }
  if (rules.phone && !validatePhone(value)) {
    return ERROR_MESSAGES.phone;
  }
  if (rules.email && !validateEmail(value)) {
    return ERROR_MESSAGES.email;
  }
  if (rules.number && !validateNumber(value)) {
    return ERROR_MESSAGES.number;
  }
  if (rules.minLength && !validateMinLength(value, rules.minLength)) {
    return ERROR_MESSAGES.minLength(rules.minLength);
  }
  if (rules.maxLength && !validateMaxLength(value, rules.maxLength)) {
    return ERROR_MESSAGES.maxLength(rules.maxLength);
  }
  if (rules.onlyLetters && !validateOnlyLetters(value)) {
    return ERROR_MESSAGES.onlyLetters;
  }
  if (rules.dni && !validateDNI(value)) {
    return ERROR_MESSAGES.dni;
  }
  if (rules.ruc && !validateRUC(value)) {
    return ERROR_MESSAGES.ruc;
  }
  if (rules.date && !validateDate(value)) {
    return ERROR_MESSAGES.date;
  }
  return null;
};

// Validar formulario completo
export const validateForm = (
  data: Record<string, any>,
  rules: Record<string, any>,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field] || "";
    const error = validateField(value, fieldRules);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
};
