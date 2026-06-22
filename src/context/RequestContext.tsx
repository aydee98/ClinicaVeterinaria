import React, { createContext, ReactNode, useReducer } from "react";
import { Request } from "../models/Request";

// Datos iniciales de ejemplo
const initialRequests: Request[] = [
  {
    id: "1",
    clienteNombre: "María García",
    telefono: "987654321",
    mascotaNombre: "Luna",
    tipoServicio: "CONSULTA",
    prioridad: "MEDIA",
    descripcion: "Revisión general y vacunas",
    estado: "PENDIENTE",
    fechaRegistro: new Date("2026-06-20"),
  },
  {
    id: "2",
    clienteNombre: "Carlos Pérez",
    telefono: "987654322",
    mascotaNombre: "Max",
    tipoServicio: "EMERGENCIA",
    prioridad: "ALTA",
    descripcion: "Dificultad para respirar",
    estado: "EN_ATENCION",
    fechaRegistro: new Date("2026-06-21"),
  },
  {
    id: "3",
    clienteNombre: "Ana López",
    telefono: "987654323",
    mascotaNombre: "Bella",
    tipoServicio: "GROOMING",
    prioridad: "BAJA",
    descripcion: "Baño y corte de pelo",
    estado: "FINALIZADO",
    fechaRegistro: new Date("2026-06-19"),
  },
];

interface RequestState {
  requests: Request[];
}

type RequestAction =
  | { type: "ADD_REQUEST"; payload: Request }
  | { type: "UPDATE_REQUEST"; payload: Request }
  | { type: "DELETE_REQUEST"; payload: { id: string } };

const initialState: RequestState = {
  requests: initialRequests,
};

const requestReducer = (
  state: RequestState,
  action: RequestAction,
): RequestState => {
  switch (action.type) {
    case "ADD_REQUEST":
      return { ...state, requests: [...state.requests, action.payload] };
    case "UPDATE_REQUEST":
      return {
        ...state,
        requests: state.requests.map((req) =>
          req.id === action.payload.id ? action.payload : req,
        ),
      };
    case "DELETE_REQUEST":
      return {
        ...state,
        requests: state.requests.filter((req) => req.id !== action.payload.id),
      };
    default:
      return state;
  }
};

interface RequestContextType {
  state: RequestState;
  addRequest: (request: Request) => void;
  updateRequest: (request: Request) => void;
  deleteRequest: (id: string) => void;
}

// ✅ Exportar el contexto
export const RequestContext = createContext<RequestContextType | undefined>(
  undefined,
);

export const RequestProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(requestReducer, initialState);

  const addRequest = (request: Request) => {
    dispatch({ type: "ADD_REQUEST", payload: request });
  };

  const updateRequest = (request: Request) => {
    dispatch({ type: "UPDATE_REQUEST", payload: request });
  };

  const deleteRequest = (id: string) => {
    dispatch({ type: "DELETE_REQUEST", payload: { id } });
  };

  return (
    <RequestContext.Provider
      value={{ state, addRequest, updateRequest, deleteRequest }}
    >
      {children}
    </RequestContext.Provider>
  );
};

// ❌ ELIMINAR esta línea (ya no se usa aquí)
// export const useRequests = () => { ... }
