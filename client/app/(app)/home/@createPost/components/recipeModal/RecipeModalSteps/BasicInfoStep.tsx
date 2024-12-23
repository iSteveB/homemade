import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CreateRecipe } from '@/types/recipes';

interface BasicInfoStepProps {
    recipe: CreateRecipe;
    updateRecipe: (field: keyof CreateRecipe, value: any) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ recipe, updateRecipe }) => {
    return (
        <>
            <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Titre de la recette</Label>
                    <Input
                        id="title"
                        value={recipe.title}
                        onChange={(e) => updateRecipe('title', e.target.value)}
                        placeholder="Je choisis un titre pour ma recette"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={recipe.description || ''}
                        onChange={(e) => updateRecipe('description', e.target.value)}
                        placeholder="J'ajoute une description"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulté</Label>
                        <Select
                            onValueChange={(value) =>
                                updateRecipe('difficulty', value as CreateRecipe['difficulty'])
                            }
                            value={recipe.difficulty || ''}>
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
                            onValueChange={(value) =>
                                updateRecipe('cost', value as CreateRecipe['cost'])
                            }
                            value={recipe.cost || ''}>
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
                    <Label htmlFor="duration">Durée</Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-1">
                            <Label htmlFor="preparation">Préparation (min)</Label>
                            <Input
                                id="preparation"
                                type="number"
                                value={recipe.duration?.preparation || ''}
                                onChange={(e) =>
                                    updateRecipe('duration', {
                                        ...recipe.duration,
                                        preparation: Number(e.target.value),
                                    })
                                }
                                placeholder="Préparation"
                                min="0"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="cooking">Cuisson (min)</Label>
                            <Input
                                id="cooking"
                                type="number"
                                value={recipe.duration?.cooking || ''}
                                onChange={(e) =>
                                    updateRecipe('duration', {
                                        ...recipe.duration,
                                        cooking: Number(e.target.value),
                                    })
                                }
                                placeholder="Cuisson"
                                min="0"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="rest">Repos (min)</Label>
                            <Input
                                id="rest"
                                type="number"
                                value={recipe.duration?.rest || ''}
                                onChange={(e) =>
                                    updateRecipe('duration', {
                                        ...recipe.duration,
                                        rest: Number(e.target.value),
                                    })
                                }
                                placeholder="Repos"
                                min="0"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </>
    );
};

export default BasicInfoStep;