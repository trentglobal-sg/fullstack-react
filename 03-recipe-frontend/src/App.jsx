
import { Switch, Route, Link } from 'wouter';
import ShowAllRecipePage from './pages/ShowAllRecipePage';
import AddRecipePage from './pages/AddRecipePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import "bootstrap/dist/css/bootstrap.min.css";
import EditRecipePage from './pages/EditRecipePage';

export default function App() {
    return (<>
        <div className="container">
            <h1>Welcome to MyRecipes.com</h1>
            <nav className="navbar navbar-expand-sm bg-light">
                <div className="container-fluid">

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/add">Add Recipe</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/register">Register</Link>
                        </li>
                         <li className="nav-item">
                            <Link className="nav-link" href="/login">Login</Link>
                        </li>
                    </ul>
                </div>

            </nav>

            <Switch>
                <Route path="/" component={ShowAllRecipePage} />
                <Route path="/add" component={AddRecipePage} />
                <Route path="/edit/:recipeId" component={EditRecipePage}/>
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
            </Switch>
            <footer className="bg-light p-3">
                (c) 2025
            </footer>
        </div>

    </>)
}