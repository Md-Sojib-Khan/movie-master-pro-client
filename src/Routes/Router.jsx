import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/HomePage/Home";
import AllMovies from "../Pages/AllMoviesPage/AllMovies";
import DetailsPage from "../Pages/DetailsPage/DetailsPage";
import Register from "../Pages/RegisterPage/Register";
import Login from "../Pages/LoginPage/Login";
import PrivateRoute from "./PrivateRoute";
import AddMovie from "../Pages/AddMovie/AddMovie";

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/all-movies',
                Component: AllMovies
            },
            {
                path: '/movies/:id',
                loader: ({ params }) => fetch(`http://localhost:3000/movies/${params.id}`),
                element: <PrivateRoute>
                    <DetailsPage></DetailsPage>
                </PrivateRoute>
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/add-movie',
                element: <AddMovie></AddMovie>
            }
        ]
    }
])

export default router