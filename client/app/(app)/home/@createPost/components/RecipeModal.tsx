'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Plus, Trash2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { RecipeSchema, Recipe } from '@/types/api/posts';
import { useCreateRecipe } from '@/hook/posts/useCreateRecipe';

type RecipeModalProps = {
  isRecipesModalOpen: boolean;
  setIsRecipesModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RecipeModal: React.FC<RecipeModalProps> = ({ isRecipesModalOpen, setIsRecipesModalOpen }) => {
	const [step, setStep] = useState(1);
  const [recipe, setRecipe] = useState<Recipe>({
		title: '',
    description: '',
    difficulty: undefined,
    cost: undefined,
    duration: { preparation: 0, cooking: 0, rest: 0 },
    servings: 1,
    categories: [],
    pictures: [],
    ingredients: [],
    ustensils: [],
    steps: [],
    tags: [],
  });
	const { createRecipe, createRecipeIsLoading, createRecipeIsError, createRecipeErrorMessage } = useCreateRecipe(recipe);

  const updateRecipe = (field: keyof Recipe, value: any) => {
    setRecipe((prev) => ({ ...prev, [field]: value }));
  };

  const addField = (field: 'ingredients' | 'ustensils' | 'steps' | 'tags') => {
    setRecipe((prev) => ({
      ...prev,
      [field]: [
        ...prev[field],
        field === 'ingredients'
          ? { name: '', quantity: 0, unit: '' }
          : field === 'steps'
          ? { order: prev[field].length + 1, description: '' }
          : { name: '' },
      ],
    }));
  };

  const updateField = (field: 'ingredients' | 'ustensils' | 'steps' | 'tags', index: number, value: any) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? { ...item, ...value } : item)),
    }));
  };

  const removeField = (field: 'ingredients' | 'ustensils' | 'steps' | 'tags', index: number) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        description: '',
      }));
      setRecipe((prev) => ({
        ...prev,
        pictures: [...prev.pictures, ...newFiles].slice(0, 10),
      }));
    }
  };

  const removePicture = (index: number) => {
    setRecipe((prev) => ({
      ...prev,
      pictures: prev.pictures.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = RecipeSchema.safeParse(recipe);
    if (result.success) {
			createRecipe(recipe);
			console.log('Recipe created successfully:', result.data);
      setIsRecipesModalOpen(false);
    } else {
      console.error('Validation errors:', result.error);
      // Handle validation errors here
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Informations de base</CardTitle>
              <CardDescription>Entrez les détails de base de votre recette.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Nom de la recette</Label>
                <Input
                  id="title"
                  value={recipe.title}
                  onChange={(e) => updateRecipe('title', e.target.value)}
                  placeholder="Entrez le nom de la recette"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={recipe.description}
                  onChange={(e) => updateRecipe('description', e.target.value)}
                  placeholder="Décrivez votre recette"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulté</Label>
                  <Select
                    onValueChange={(value) => updateRecipe('difficulty', value)}
                    value={recipe.difficulty}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez la difficulté" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EASY">Facile</SelectItem>
                      <SelectItem value="MEDIUM">Moyen</SelectItem>
                      <SelectItem value="HARD">Difficile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Coût</Label>
                  <Select
                    onValueChange={(value) => updateRecipe('cost', value)}
                    value={recipe.cost}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez le coût" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CHEAP">Bon marché</SelectItem>
                      <SelectItem value="NORMAL">Normal</SelectItem>
                      <SelectItem value="EXPENSIVE">Coûteux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servings">Nombre de portions</Label>
                  <Input
                    id="servings"
                    type="number"
                    value={recipe.servings}
                    onChange={(e) => updateRecipe('servings', Number(e.target.value))}
                    placeholder="Nombre de portions"
                    min="1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pictures">Photos (max 10)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="pictures"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <Label
                    htmlFor="pictures"
                    className="flex h-32 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed hover:bg-gray-50"
                  >
                    <Upload className="size-8 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500">Cliquez pour ajouter des photos</span>
                  </Label>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {recipe.pictures.map((picture, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={picture.url}
                        alt={picture.name}
                        width={200}
                        height={200}
                        className="h-24 w-full rounded-md object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-1 top-1"
                        onClick={() => removePicture(index)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Ingrédients et Ustensiles</CardTitle>
              <CardDescription>Listez les ingrédients et ustensiles nécessaires pour votre recette.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Ingrédients</Label>
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex w-1/3 space-x-2">
                      <Input
                        type="number"
                        value={ingredient.quantity}
                        onChange={(e) => updateField('ingredients', index, { quantity: Number(e.target.value) })}
                        placeholder="Quantité"
                        className="w-1/2"
                      />
                      <Input
                        value={ingredient.unit}
                        onChange={(e) => updateField('ingredients', index, { unit: e.target.value })}
                        placeholder="Unité"
                        className="w-1/2"
                      />
                    </div>
                    <Input
                      value={ingredient.name}
                      onChange={(e) => updateField('ingredients', index, { name: e.target.value })}
                      placeholder="Nom de l'ingrédient"
                      className="w-2/3 pl-3"
                    />
                    <Button variant="outline" size="icon" onClick={() => removeField('ingredients', index)}>
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={(e) => { e.preventDefault(); addField('ingredients'); }} variant="outline">
                  <Plus className="mr-2 size-4" /> Ajouter un ingrédient
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Ustensiles</Label>
                <div className="flex flex-wrap gap-2">
                  {recipe.ustensils.map((ustensil, index) => (
                    <div key={index} className="flex items-center space-x-2 rounded-md bg-gray-100 p-2">
                      <Input
                        value={ustensil.name}
                        onChange={(e) => updateField('ustensils', index, { name: e.target.value })}
                        placeholder="Nom de l'ustensile"
                        className="w-auto border-none bg-transparent"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeField('ustensils', index)}
                        className="text-red-500 hover:bg-transparent hover:text-red-700"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button type="button" onClick={(e) => { e.preventDefault(); addField('ustensils'); }} variant="outline">
                  <Plus className="mr-2 size-4" /> Ajouter un ustensile
                </Button>
              </div>
            </CardContent>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
              <CardDescription>Fournissez les instructions étape par étape pour votre recette.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="shrink-0 font-bold">{index + 1}.</div>
                  <Textarea
                    value={step.description}
                    onChange={(e) => updateField('steps', index, { description: e.target.value })}
                    placeholder={`Étape ${index + 1}`}
                  />
                  <Button variant="outline" size="icon" onClick={() => removeField('steps', index)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={(e) => { e.preventDefault(); addField('steps'); }} variant="outline">
                <Plus className="mr-2 size-4" /> Ajouter une étape
              </Button>
            </CardContent>
          </>
        );
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle>Catégories et Tags</CardTitle>
              <CardDescription>Ajoutez des catégories et des tags à votre recette.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Catégories (max 2)</Label>
                <Select
                  onValueChange={(value) => {
                    const newCategories = [...recipe.categories, { name: value }];
                    if (newCategories.length <= 2) {
                      updateRecipe('categories', newCategories);
                    }
                  }}
                  value=""
                  disabled={recipe.categories.length >= 2}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {['petit-déjeuner', 'déjeuner', 'dîner', 
                      'boisson', 'apéritif', 'snack', 'dessert', 'entrée'].map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-2 flex flex-wrap gap-2">
                  {recipe.categories.map((category, index) => (
                    <div key={index} className="flex items-center space-x-2 rounded-md bg-gray-100 p-2">
                      <span>{category.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => updateRecipe('categories', recipe.categories.filter((_, i) => i !== index))}
                        className="text-red-500 hover:bg-transparent hover:text-red-700"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tags (max 5)</Label>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2 rounded-md bg-gray-100 p-2">
                      <Input
                        value={tag.name}
                        onChange={(e) => updateField('tags', index, { name: e.target.value })}
                        placeholder="Nom du tag"
                        className="w-auto min-w-0 border-none bg-transparent"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeField('tags', index)}
                        className="p-0 text-red-500 hover:bg-transparent hover:text-red-700"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button 
                  type="button"
                  onClick={(e) => { e.preventDefault(); addField('tags'); }} 
                  variant="outline" 
                  disabled={recipe.tags.length >= 5}
                >
                  <Plus className="mr-2 size-4" /> Ajouter un tag
                </Button>
              </div>
            </CardContent>
          </>
        );
      case 5:
        return (
          <>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Vérifiez votre recette avant de la soumettre.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Titre:</h3>
                <p>{recipe.title}</p>
              </div>
              <div>
                <h3 className="font-semibold">Description:</h3>
                <p>{recipe.description}</p>
              </div>
              <div>
                <h3 className="font-semibold">Difficulté:</h3>
                <p>{recipe.difficulty}</p>
              </div>
              <div>
                <h3 className="font-semibold">Coût:</h3>
                <p>{recipe.cost}</p>
              </div>
              <div>
                <h3 className="font-semibold">Durée:</h3>
                <p>Préparation: {recipe.duration.preparation} min</p>
                <p>Cuisson: {recipe.duration.cooking} min</p>
                <p>Repos: {recipe.duration.rest} min</p>
              </div>
              <div>
                <h3 className="font-semibold">Nombre de portions:</h3>
                <p>{recipe.servings}</p>
              </div>
              <div>
                <h3 className="font-semibold">Ingrédients:</h3>
                <ul className="list-disc pl-5">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.quantity} {ingredient.unit} {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Ustensiles:</h3>
                <ul className="list-disc pl-5">
                  {recipe.ustensils.map((ustensil, index) => (
                    <li key={index}>{ustensil.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Instructions:</h3>
                <ol className="list-decimal pl-5">
                  {recipe.steps.map((step, index) => (
                    <li key={index}>{step.description}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="font-semibold">Catégories:</h3>
                <ul className="list-disc pl-5">
                  {recipe.categories.map((category, index) => (
                    <li key={index}>{category.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Tags:</h3>
                <ul className="list-disc pl-5">
                  {recipe.tags.map((tag, index) => (
                    <li key={index}>{tag.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Photos:</h3>
                <div className="grid grid-cols-5 gap-2">
                  {recipe.pictures.map((picture, index) => (
                    <Image
                      key={index}
                      src={picture.url}
                      alt={picture.name}
                      width={100}
                      height={100}
                      className="h-20 w-full rounded-md object-cover"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isRecipesModalOpen} onOpenChange={setIsRecipesModalOpen}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Nouvelle Recette</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card>
            {renderStep()}
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
                disabled={step === 1}
                variant="outline"
              >
                <ChevronLeft className="mr-2 size-4" /> Précédent
              </Button>
              {step < 5 ? (
                <Button type="button" onClick={(e) => { e.preventDefault(); setStep((prev) => Math.min(prev + 1, 5)); }}>
                  Suivant <ChevronRight className="ml-2 size-4" />
                </Button>
              ) : (
                <Button type="submit">Soumettre la recette</Button>
              )}
            </CardFooter>
          </Card>
          <div className="mt-4 flex justify-center">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`mx-1 size-3 rounded-full ${s === step ? 'bg-primary' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;