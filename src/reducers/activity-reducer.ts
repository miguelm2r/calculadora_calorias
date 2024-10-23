import { Activity } from "../types/index";

// Definimos el tipo de las activityActions
export type activityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activeId"; payload: { id: Activity["id"] } }
  | { type: "delete-activity"; payload: { id: Activity["id"] } }
  | { type: "restart-app" };

// Definimos el tipo del activityState que sera un array activities de tipo Activity. El Estado gestionara una lista de objetos de tipo Activity.
// El activeId sirve para al pulsar un boton sepamos cual es mediante su id
export type activityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

// Revisamos si tenemos algo en localstorage
const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

// El estado inicial sera una lista de actividades vacia
export const initialState: activityState = {
  activities: localStorageActivities(),
  activeId: "",
};

// Creamos el reducer de activityReducer que se ejecutara al enviar el formulario. El reducer recibe un state y una accion y retorna un nuevo state en funcion de la accion recibida
export const activityReducer = (
  state: activityState = initialState,
  action: activityActions
) => {
  if (action.type === "save-activity") {
    // Este codigo maneja la logica para actualizar el state
    let updatedActivities: Activity[] = [];
    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }
    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }

  if (action.type === "restart-app") {
    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};
