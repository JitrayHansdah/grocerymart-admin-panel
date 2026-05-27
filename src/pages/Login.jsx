import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin = (e) => {

        e.preventDefault();

        // ADMIN LOGIN

        if (
            email === "admin@gmail.com" &&
            password === "admin123"
        ) {

            localStorage.setItem(
                "admin",
                JSON.stringify({
                    email,
                })
            );

            navigate("/");

        } else {

            alert("Invalid Admin Credentials");
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleLogin}
                className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
            >

                <h1 className="text-4xl font-bold text-center mb-8">
                    Admin Login
                </h1>

                <input
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="border w-full p-4 rounded-xl mb-5"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="border w-full p-4 rounded-xl mb-6"
                    required
                />

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white w-full py-4 rounded-xl text-lg"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;