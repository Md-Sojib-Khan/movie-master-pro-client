import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/HomePage/Home";
import AllMovies from "../Pages/AllMoviesPage/AllMovies";

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children:[
            {
                index: true,
                Component:Home
            },
            {
                path: '/all-movies',
                Component: AllMovies
            }
        ]
    }
])

export default router