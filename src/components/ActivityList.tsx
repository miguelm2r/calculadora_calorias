import { Activity } from "../types";
import { categories } from "../data/categories";
import { useMemo } from "react";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { activityActions } from "../reducers/activity-reducer";

type activityListProps = {
  activities: Activity[];
  dispatch: React.Dispatch<activityActions>;
};

// La funcion nos trae las actividades que es un array de activity para renderizarlas y mostrarlas
export default function ActivityList({
  activities,
  dispatch,
}: activityListProps) {
  // useMemo solo llama a la funcion si la dependencia cambia. En este caso seria activities.
  // Dentro se encuentra una funcion interna donde recorre el array categories y si el valor category es igual al id de cat devuelve el name.
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>

      {activities.map((activity) => (
        <div
          key={activity.id}
          className="px-5 py-10 bg-white mt-5 flex justify-between"
        >
          <div className="space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
              }`}
            >
              {categoryName(+activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.name}</p>
            <p className="font-black text-4xl text-lime-500 pt-5">
              {activity.calories} {""}
              <span>Calorias</span>
            </p>
          </div>
          <div className="flex gap-5 text-center">
            <button
              onClick={() =>
                dispatch({ type: "set-activeId", payload: { id: activity.id } })
              }
            >
              <PencilSquareIcon className="h-8 w-8 text-gray-800" />
            </button>

            <button
              onClick={() =>
                dispatch({
                  type: "delete-activity",
                  payload: { id: activity.id },
                })
              }
            >
              <XCircleIcon className="h-8 w-8 text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
