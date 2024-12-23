import React from 'react'
import { Step } from '@/types/recipes'

interface RecipeStepsProps {
  steps?: Step[]
}

export default function RecipeSteps({ steps }: RecipeStepsProps) {
  if (!steps || steps.length === 0) return null

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Instructions</h3>
      <ol className="list-decimal pl-5">
        {steps.map((step) => (
          <li key={step.order} className="mb-2">
            {step.description}
          </li>
        ))}
      </ol>
    </div>
  )
}

