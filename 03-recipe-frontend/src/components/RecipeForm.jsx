import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecipeForm({ cuisines, categories, tags, onSubmit, formState, setFormState }) {

    const handleFormChange = (event) => {
        const fieldName = event.target.name;
        const newValue = event.target.value;
        const newFormState = {
            ...formState,
            [fieldName]: newValue
        }
        setFormState(newFormState);
    }

    const handleMultiSelectChange = (event) => {
        const fieldName = event.target.name;
        const newValues = Array.from(event.target.options)
            .filter(o => o.selected)
            .map(o => o.value);


        const newFormState = {
            ...formState,
            [fieldName]: newValues
        }
        setFormState(newFormState);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState);
    }

    return (
        <form className="container py-4" onSubmit={handleSubmit}>
            {/* Recipe Name */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Recipe Name *</label>
                <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter recipe name"
                    required
                    onChange={handleFormChange}
                    value={formState.name}
                />
            </div>

            {/* Description */}
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description *</label>
                <textarea
                    name="description"
                    className="form-control"
                    id="description"
                    rows="3"
                    placeholder="Describe your recipe"
                    required
                    onChange={handleFormChange}
                    value={formState.description}
                ></textarea>
            </div>

            {/* Cooking Time */}
            <div className="mb-3">
                <label htmlFor="cooking_time" className="form-label">Cooking Time (minutes) *</label>
                <input
                    name="cooking_time"
                    type="number"
                    className="form-control"
                    id="cooking_time"
                    min="1"
                    placeholder="e.g. 30"
                    required
                    onChange={handleFormChange}
                    value={formState.cooking_time}
                />
            </div>

            {/* Ingredients */}
            <div className="mb-3">
                <label htmlFor="ingredients" className="form-label">
                    Ingredients * <small className="text-muted">(comma separated)</small>
                </label>
                <textarea
                    name="ingredients"
                    className="form-control"
                    id="ingredients"
                    rows="3"
                    placeholder="e.g. chicken, rice, flour"
                    required
                    onChange={handleFormChange}
                    value={formState.ingredients}
                ></textarea>
            </div>

            {/* Steps */}
            <div className="mb-3">
                <label htmlFor="steps" className="form-label">
                    Preparation Steps * <small className="text-muted">(one per line)</small>
                </label>
                <textarea
                    name="steps"
                    className="form-control"
                    id="steps"
                    rows="5"
                    placeholder="Step 1: ...&#10;Step 2: ..."
                    required
                    onChange={handleFormChange}
                    value={formState.steps}
                ></textarea>
            </div>

            {/* Cuisine Selection */}
            <div className="mb-3">
                <label htmlFor="cuisine_id" className="form-label">Cuisine *</label>
                <select className="form-select" id="cuisine_id" name="cuisine_id" onChange={handleFormChange} required >
                    <option value="0">Select a cuisine</option>
                    {cuisines.map(cuisine => (
                        <option key={cuisine.cuisine_id} 
                                value={cuisine.cuisine_id}
                                selected={cuisine.cuisine_id == formState.cuisine_id}
                                >
                            {cuisine.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Category Selection */}
            <div className="mb-3">
                <label htmlFor="category_id" className="form-label" name="category">Category *</label>
                <select className="form-select" id="category_id" name="category_id" onChange={handleFormChange} required>
                    <option value="0">Select a category</option>
                    {categories.map(category => (
                        <option key={category.category_id}
                                value={category.category_id}
                                selected={category.category_id == formState.category_id}
                                >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tags */}
            <div className="mb-3">
                <label htmlFor="tags" className="form-label" name="tags">Tags</label>
                <select
                    multiple
                    className="form-select"
                    id="tags"
                    size="3"
                    onChange={handleMultiSelectChange}
                    name="tag_ids"
                >
                    {tags.map(tag => (
                        <option key={tag.tag_id} 
                                value={tag.tag_id} 
                                selected={formState.tag_ids.includes(tag.tag_id)}
                        >
                            {tag.name}
                        </option>
                    ))}
                </select>
                <small className="text-muted">Hold Ctrl/Cmd to select multiple</small>
            </div>

            <button type="submit" className="btn btn-primary">Submit Recipe</button>
        </form>
    );
};

export default RecipeForm;