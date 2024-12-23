import React from 'react'
import { Ingredient } from '@/types/recipes'

interface RecipeIngredientsProps {
  ingredients?: Ingredient[]
}

export default function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  if (!ingredients || ingredients.length === 0) return null

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
      <ul className="list-disc pl-5">
        {ingredients.map((ingredient) => (
          <li key={ingredient.name}>
            {ingredient.quantity} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

