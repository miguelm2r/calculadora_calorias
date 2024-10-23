import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { activityActions, activityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<activityActions>;
  state: activityState;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  // En este useEffect, si activeId tiene algo, lo pone en el formulario para editarlo
  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  // Creamos una funcion que al introducir algun dato en el formulario, actualice el objeto de activity.
  const handleChange = (
    // le decimos que el tipo de e va a ser alguno de los dos
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    // Creamos una variable que compruebe si es un string o un number debido a que nuestros number van a tener id y los string no
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      //Comprueba si el campo contiene un numero y si es true el valor isNumberField , transforma con el + el valor de e.target.value a number
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    // verificamos que el valor de name contenga algo y que calories sea mayor que 0
    return name.trim() !== "" && calories > 0;
  };

  // Cuando enviamos el formulario, el dispatch llama al reducer activityReducer cuyo payload es newActivity del tipo activity.
  // Le pasamos el type save-activity y lo comprobara luego en el reducer. Tambien le mandamos el activity
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    // Reiniciamos el formulario
    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold ">
          Categoria:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold ">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Comida, Refresco, Ensalada, Ejercicio, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        ></input>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold ">
          Actividad:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="200, 300"
          value={activity.calories}
          onChange={handleChange}
        ></input>
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value="Guardar"
        disabled={!isValidActivity()}
      ></input>
    </form>
  );
}
