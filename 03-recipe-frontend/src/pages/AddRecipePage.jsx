import axios from "axios";
import { useState, useEffect } from "react";
import RecipeForm from "../components/RecipeForm";
import { useLocation } from "wouter";

export default function AddRecipePage() {

    const [tags, setTags] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const [categories, setCategories] = useState([]);
    const [, setLocation] = useLocation();

    const onSubmit = async (newRecipe) => {
        const response = await axios.post(import.meta.env.VITE_BASE_API_URL+"/recipes", newRecipe);
        setLocation("/");
    }

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
        <h1>Add Recipe</h1>
        <RecipeForm tags={tags} 
                    cuisines={cuisines} 
                    categories={categories}
                    onSubmit={onSubmit}
        />
    </>)
}