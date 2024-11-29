import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { CreateRecipe } from '@/types/recipes';

type IngredientsListProps = {
  ingredients: CreateRecipe['ingredients'];
  setIngredients: React.Dispatch<React.SetStateAction<CreateRecipe['ingredients']>>;
};

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients, setIngredients }) => {
  const addIngredient = () => {
    setIngredients((prev) => [...(prev || []), { name: '', quantity: 0, unit: '' }]);
  };

  const updateIngredient = (index: number, field: string, value: any) => {
    setIngredients((prev) =>
      prev!.map((ingredient, i) => (i === index ? { ...ingredient, [field]: value } : ingredient)),
    );
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev!.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {ingredients?.map((ingredient, index) => (
        <div key={index} className="flex items-center space-x-2">
          {/* Champs pour quantité, unité, nom */}
          <Button variant="outline" size="icon" onClick={() => removeIngredient(index)}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addIngredient} variant="outline">
        <Plus className="mr-2 size-4" /> Ajouter un ingrédient
      </Button>
    </div>
  );
};

export default IngredientsList;