import MainPage from "./MainPage";
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Recipes from './Recipes';
import Recipe from "./Recipe";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://6803c2e479cb28fb3f599ac2.mockapi.io/recipes/M-one');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(Object.values(data));
      } catch (error) {
        setError(error.message);
        console.error('Error fetching recipes:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-gray-700 py-8">Loading recipes...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500 py-8">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route 
          path="/recipes" 
          element={<Recipes recipes={recipes} />}
        />
        <Route 
          path="/recipes/:id" 
          element={<Recipe recipes={recipes} />}
        />
      </Routes>
    </div>
  );
}