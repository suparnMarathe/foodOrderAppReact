import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";
const requestConfig = {};
export default function Meals() {
  const {
    data: loadedMeals,
    errorMessage,
    isLoading,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }
  // console.log(loadedMeals);
  if (errorMessage) {
    return <Error title="Failed to fetch meals!" message={errorMessage} />;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
