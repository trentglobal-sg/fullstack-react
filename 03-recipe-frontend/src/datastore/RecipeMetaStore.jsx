import { atom, useAtom } from "jotai";  // an atom is a state data shared across multiple components
import axios from "axios";

// create the initial atom
export const recipeMetaAtom = atom({
    tags: [],
    cuisines: [],
    categories: []
});

const isLoadingAtom = atom(false);

export const useRecipeMeta = () => {
    // useAtom returns two values in an array
    // first element: the current values of the atom (read-only)
    const [meta, setMeta] = useAtom(recipeMetaAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

    const fetchAll = async () => {

        try {
            // if the meta data are aleady being loaded from the API, don't fetch again
            if (isLoading) return;

            setIsLoading(true); // indicate that we are already loading the data

            const requests = [
                axios.get(import.meta.env.VITE_BASE_API_URL + "/tags"),
                axios.get(import.meta.env.VITE_BASE_API_URL + "/cuisines"),
                axios.get(import.meta.env.VITE_BASE_API_URL + "/categories")
            ]

            const responses = await axios.all(requests);

            setIsLoading(false);

            setMeta({
                tags: responses[0].data,
                cuisines: responses[1].data,
                categories: responses[2].data
            })
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }

    }

    const getTags = () => () => {

        return meta.tags;
    };
    const getCuisines = () => () => {
        console.log(meta.cuisines);
        return meta.cuisines;
    };
    const getCategories = () => () => {

        return meta.categories;
    };

    return { fetchAll, getTags, getCategories, getCuisines }
}