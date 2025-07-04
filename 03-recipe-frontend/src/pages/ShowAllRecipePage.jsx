import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function ShowAllRecipePage() {

    // state to store all recipes
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    // use axios to get all the recipes when this component mounts (i.e render for the first time)
    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await axios.get(import.meta.env.VITE_BASE_API_URL + "/recipes");
            setRecipes(response.data.recipes);
            setLoading(false);
        }
        fetchRecipes();
    }, []); // array is empty--> when the component is being rendered for the first time

    return (<>
        <h1>All Recipes</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Cuisine</th>
                    <th>Category</th>
                    <th>Cooking Time</th>
                    <th>Tags</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    loading ? (<tr>
                        <td colspan="5">Loading please wait....</td>
                    </tr>) :
                        recipes.map(r => (
                            <tr key={r.recipe_id}>
                                <td>{r.name}</td>
                                <td>{r.cuisine_name}</td>
                                <td>{r.category_name}</td>
                                <td>{r.cooking_time}</td>
                                <td>
                                    {
                                        r.tags?.split(',').map(t => <span className="me-1 ms-1 badge bg-primary">{t}</span>)
                                    }
                                </td>
                                <td>
                                    <Link href={"/edit/" + r.recipe_id} className="btn btn-primary btn-sm">Edit</Link>
                                </td>
                            </tr>
                        ))
                }
            </tbody>
        </table>
    </>)
}