import axios from "axios";
import { useState, useEffect } from "react";
import RecipeForm from "../components/RecipeForm";
import { useLocation } from "wouter";
import { useRecipeMeta } from "../datastore/RecipeMetaStore";

export default function AddRecipePage() {

    const [, setLocation] = useLocation();
    const [formState, setFormState] = useState({
        name: "",
        description: "",
        cooking_time: 0,
        ingredients: "",
        steps: "",
        cuisine_id: 0,
        category_id: 0,
        tag_ids: []
    })
    const {getTags, getCuisines, getCategories, fetchAll} = useRecipeMeta();

    useEffect(()=>{
        fetchAll();
    }, []);

    const onSubmit = async (newRecipe) => {
        const response = await axios.post(import.meta.env.VITE_BASE_API_URL + "/recipes", newRecipe);
        setLocation("/");
    }

    // useEffect(() => {

    //     const fetchFormData = async () => {
    //         const requests = [
    //             axios.get(import.meta.env.VITE_BASE_API_URL + "/tags"),
    //             axios.get(import.meta.env.VITE_BASE_API_URL + "/cuisines"),
    //             axios.get(import.meta.env.VITE_BASE_API_URL + "/categories")
    //         ]

    //         const responses = await axios.all(requests);
    //         setTags(responses[0].data);
    //         setCuisines(responses[1].data);
    //         setCategories(responses[2].data);
    //     }
    //     fetchFormData();

    // }, [])

    return (<>
        <h1>Add Recipe</h1>
        <RecipeForm tags={getTags()}
            cuisines={getCuisines()}
            categories={getCategories()}
            onSubmit={onSubmit}
            formState={formState}
            setFormState={setFormState}
        />
    </>)
}