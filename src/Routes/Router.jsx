import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/HomePage/Home";
import AllMovies from "../Pages/AllMoviesPage/AllMovies";
import DetailsPage from "../Pages/DetailsPage/DetailsPage";
import Register from "../Pages/RegisterPage/Register";
import Login from "../Pages/LoginPage/Login";
import PrivateRoute from "./PrivateRoute";
import AddMovie from "../Pages/AddMovie/AddMovie";
import MyCollection from "../Pages/MyCollection/MyCollection";
import UpdateMovie from "../Pages/UpdateMovie/UpdateMovie";
import Wishlist from "../Pages/WishlistPage/Wishlist";

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
                element: <DetailsPage></DetailsPage>
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
                element: <PrivateRoute>
                    <AddMovie></AddMovie>
                </PrivateRoute>
            },
            {
                path: '/my-collection',
                element: <PrivateRoute>
                    <MyCollection></MyCollection>
                </PrivateRoute>
            },
            {
                path: '/movies/update/:id',
                loader: ({ params }) => fetch(`http://localhost:3000/movies/${params.id}`),
                element: <PrivateRoute>
                    <UpdateMovie></UpdateMovie>
                </PrivateRoute>
            },
            {
                path: '/my-wishlist',
                element: <Wishlist></Wishlist>
            }
        ]
    }
])

export default router