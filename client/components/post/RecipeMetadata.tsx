import React from 'react'
import { FetchRecipe } from '../types/recipes'
import { Badge } from "@/components/ui/badge"

interface RecipeMetadataProps {
  recipe: FetchRecipe
}

export default function RecipeMetadata({ recipe }: RecipeMetadataProps) {
  return (
    <div className="space-y-4">
      {recipe.tags && recipe.tags.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <Badge key={tag.id} variant="outline">{tag.name}</Badge>
            ))}
          </div>
        </div>
      )}
      <div className="text-sm text-gray-500">
        <p>Created by {recipe.user.name} on {new Date(recipe.createdAt).toLocaleDateString()}</p>
        <p>Last updated: {new Date(recipe.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  )
}

