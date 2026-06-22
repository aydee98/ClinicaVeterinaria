/**
 * Constantes globales de la aplicación
 */

// Tipos de servicio
export const SERVICE_TYPES = {
  CONSULTA: "CONSULTA",
  VACUNACION: "VACUNACION",
  EMERGENCIA: "EMERGENCIA",
  GROOMING: "GROOMING",
} as const;

export const SERVICE_TYPES_LABELS = {
  [SERVICE_TYPES.CONSULTA]: "Consulta",
  [SERVICE_TYPES.VACUNACION]: "Vacunación",
  [SERVICE_TYPES.EMERGENCIA]: "Emergencia",
  [SERVICE_TYPES.GROOMING]: "Grooming",
} as const;

export const SERVICE_TYPES_ICONS = {
  [SERVICE_TYPES.CONSULTA]: "medkit",
  [SERVICE_TYPES.VACUNACION]: "fitness",
  [SERVICE_TYPES.EMERGENCIA]: "alert-circle",
  [SERVICE_TYPES.GROOMING]: "cut",
} as const;

export const SERVICE_TYPES_COLORS = {
  [SERVICE_TYPES.CONSULTA]: "#3B82F6",
  [SERVICE_TYPES.VACUNACION]: "#10B981",
  [SERVICE_TYPES.EMERGENCIA]: "#EF4444",
  [SERVICE_TYPES.GROOMING]: "#8B5CF6",
} as const;

// Niveles de prioridad
export const PRIORITY_LEVELS = {
  BAJA: "BAJA",
  MEDIA: "MEDIA",
  ALTA: "ALTA",
} as const;

export const PRIORITY_LABELS = {
  [PRIORITY_LEVELS.BAJA]: "Baja",
  [PRIORITY_LEVELS.MEDIA]: "Media",
  [PRIORITY_LEVELS.ALTA]: "Alta",
} as const;

export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.BAJA]: "#10B981",
  [PRIORITY_LEVELS.MEDIA]: "#F59E0B",
  [PRIORITY_LEVELS.ALTA]: "#EF4444",
} as const;

export const PRIORITY_BG_COLORS = {
  [PRIORITY_LEVELS.BAJA]: "#D1FAE5",
  [PRIORITY_LEVELS.MEDIA]: "#FEF3C7",
  [PRIORITY_LEVELS.ALTA]: "#FEE2E2",
} as const;

// Estados de solicitud
export const REQUEST_STATUS = {
  PENDIENTE: "PENDIENTE",
  EN_ATENCION: "EN_ATENCION",
  FINALIZADO: "FINALIZADO",
} as const;

export const STATUS_LABELS = {
  [REQUEST_STATUS.PENDIENTE]: "Pendiente",
  [REQUEST_STATUS.EN_ATENCION]: "En Atención",
  [REQUEST_STATUS.FINALIZADO]: "Finalizado",
} as const;

export const STATUS_COLORS = {
  [REQUEST_STATUS.PENDIENTE]: "#F59E0B",
  [REQUEST_STATUS.EN_ATENCION]: "#3B82F6",
  [REQUEST_STATUS.FINALIZADO]: "#10B981",
} as const;

export const STATUS_BG_COLORS = {
  [REQUEST_STATUS.PENDIENTE]: "#FEF3C7",
  [REQUEST_STATUS.EN_ATENCION]: "#DBEAFE",
  [REQUEST_STATUS.FINALIZADO]: "#D1FAE5",
} as const;

// Opciones para selectores
export const SERVICE_OPTIONS = Object.entries(SERVICE_TYPES_LABELS).map(
  ([value, label]) => ({
    label,
    value,
    icon: SERVICE_TYPES_ICONS[value as keyof typeof SERVICE_TYPES_ICONS],
  }),
);

export const PRIORITY_OPTIONS = Object.entries(PRIORITY_LABELS).map(
  ([value, label]) => ({
    label,
    value,
  }),
);

export const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(
  ([value, label]) => ({
    label,
    value,
  }),
);

// Colores de la aplicación
export const APP_COLORS = {
  primary: "#3B82F6",
  secondary: "#6B7280",
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
  light: "#F3F4F6",
  dark: "#1F2937",
  white: "#FFFFFF",
  black: "#000000",
} as const;

// Dimensiones
export const APP_DIMENSIONS = {
  headerHeight: 60,
  footerHeight: 50,
  borderRadius: 12,
  padding: 16,
  margin: 16,
  cardElevation: 4,
} as const;

// Textos de la aplicación
export const APP_TEXTS = {
  appName: "VetCare",
  appSubtitle: "Clínica Veterinaria",
  welcome: "Bienvenido",
  login: "Ingresar",
  logout: "Cerrar Sesión",
  save: "Guardar",
  cancel: "Cancelar",
  delete: "Eliminar",
  edit: "Editar",
  create: "Crear",
  search: "Buscar",
  loading: "Cargando...",
  empty: "No hay datos disponibles",
  error: "Ha ocurrido un error",
  success: "Operación exitosa",
} as const;

// ✅ CAMBIADO: Renombrado a SUCCESS_MESSAGES
export const SUCCESS_MESSAGES = {
  created: "Solicitud creada correctamente",
  updated: "Solicitud actualizada correctamente",
  deleted: "Solicitud eliminada correctamente",
  statusChanged: "Estado actualizado correctamente",
} as const;

// ✅ CAMBIADO: Renombrado a ERROR_MESSAGES_APP
export const ERROR_MESSAGES_APP = {
  createFailed: "Error al crear la solicitud",
  updateFailed: "Error al actualizar la solicitud",
  deleteFailed: "Error al eliminar la solicitud",
  loadFailed: "Error al cargar los datos",
  notFound: "Solicitud no encontrada",
} as const;

// ✅ CAMBIADO: Renombrado a CONFIRM_MESSAGES
export const CONFIRM_MESSAGES = {
  delete: "¿Estás seguro de eliminar esta solicitud?",
  deleteTitle: "Eliminar Solicitud",
  deleteCancel: "Cancelar",
  deleteConfirm: "Eliminar",
  statusChange: "¿Estás seguro de cambiar el estado?",
  statusChangeTitle: "Cambiar Estado",
  statusChangeCancel: "Cancelar",
  statusChangeConfirm: "Cambiar",
} as const;

// Formato de fecha
export const DATE_FORMAT = {
  default: "dd/MM/yyyy",
  long: "dd/MM/yyyy HH:mm",
  short: "dd/MM/yy",
  api: "yyyy-MM-dd",
} as const;

// Rutas de navegación
export const ROUTES = {
  home: "/",
  requests: "/requests",
  create: "/requests/create",
  detail: "/requests/:id",
} as const;
