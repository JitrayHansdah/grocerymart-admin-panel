import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const logoutHandler = () => {

        localStorage.removeItem("admin");

        navigate("/login");
    };

    return (

        <div className="w-64 min-h-screen bg-green-600 text-white p-6">

            <h1 className="text-3xl font-bold mb-10">
                Grocery Admin
            </h1>

            <div className="space-y-4">

                <Link
                    to="/"
                    className="block hover:bg-green-700 px-4 py-3 rounded-xl"
                >
                    Dashboard
                </Link>

                <Link
                    to="/products"
                    className="block hover:bg-green-700 px-4 py-3 rounded-xl"
                >
                    Products
                </Link>

                <Link
                    to="/orders"
                    className="block hover:bg-green-700 px-4 py-3 rounded-xl"
                >
                    Orders
                </Link>

                <button
                    onClick={logoutHandler}
                    className="w-full text-left hover:bg-red-600 bg-red-500 px-4 py-3 rounded-xl mt-10"
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Sidebar;