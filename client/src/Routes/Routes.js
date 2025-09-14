import {TODO} from '../Views/TODO/TODO';
import {Login} from '../Views/Auth/Login';
import {Register} from '../Views/Auth/Register';
import {Homepage} from '../Views/Home/Homepage';
import {HomeRoute, ProtectedRoute} from '../Components/ProtectedRoute';

// Wrapper components for route protection
const ProtectedHomepage = () => (
    <HomeRoute>
        <Homepage />
    </HomeRoute>
);

const ProtectedTodos = () => (
    <ProtectedRoute>
        <TODO />
    </ProtectedRoute>
);

const MyURLs = [
    {
        path: "/",
        view: ProtectedHomepage,
        title: "Home"
    },
    {
        path: "/todos",
        view: ProtectedTodos,
        title: "My TODOs"
    },
    {
        path: "/login",
        view: Login,
        title: "Login"
    },
    {
        path: "/register",
        view: Register,
        title: "Register"
    }
]

export default MyURLs;