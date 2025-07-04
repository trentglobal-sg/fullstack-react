import { useParams } from "wouter";
import axios from "axios";
import { useEffect, useState } from 'react';
import RecipeForm from "../components/RecipeForm";

export default function EditRecipePage() {

    const { recipeId } = useParams();   
    const [recipe, setRecipe] = useState({});
    const [tags, setTags] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formState, setFormState] = useState({
        name: "",
        description: "",
        cooking_time: "",
        ingredients: "",
        steps: "",
        cuisine_id: 0,
        category_id: 0,
        tags: []
    })


    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await axios.get(import.meta.env.VITE_BASE_API_URL + "/recipes/" + recipeId);
            setRecipe(response.data.recipe);
            console.log(response.data.recipe);
            const recipe = response.data.recipe;
            setFormState({
                name: recipe.name,
                description: recipe.description,
                cooking_time: recipe.cooking_time,
                ingredients: recipe.ingredients,
                steps: recipe.steps,
                cuisine_id: recipe.cuisine_id,
                category_id: recipe.category_id,
                tag_ids: recipe.tag_ids
            })
            
        }
        fetchRecipe();
    }, []);

    useEffect(() => {
        const fetchFormData = async () => {
            const requests = [
                axios.get(import.meta.env.VITE_BASE_API_URL + "/tags"),
                axios.get(import.meta.env.VITE_BASE_API_URL + "/cuisines"),
                axios.get(import.meta.env.VITE_BASE_API_URL + "/categories")
            ]

            const responses = await axios.all(requests);
            setTags(responses[0].data);
            setCuisines(responses[1].data);
            setCategories(responses[2].data);
        }
        fetchFormData();

    }, [])

    return (<>
        <h1>Edit Recipe: {recipe.name}</h1>
        <RecipeForm tags={tags} 
                    categories={categories} 
                    cuisines={cuisines} 
                    formState={formState}/>

    </>)
}