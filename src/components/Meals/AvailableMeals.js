import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-1cb42-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
      );
      const responseData = await response.json(); // burdan asenkron olarak dönnen json objesi js objesine dönüştürülür

      const loadedMeals = []; // ancak dönüştürdüğümüz js objesini de map ile kullanabilmek için array yapmamız gerek

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
    };
  }, []);

  const mealList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        price={meal.price}
        description={meal.description}
        name={meal.name}
      ></MealItem>
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
