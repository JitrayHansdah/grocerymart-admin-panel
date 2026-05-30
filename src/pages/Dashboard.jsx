import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../component/Sidebar";

function Dashboard() {

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    // FETCH ORDERS

    const fetchOrders = async () => {

        try {

            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/admin/orders`
            );

            setOrders(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    // FETCH PRODUCTS

    const fetchProducts = async () => {

        try {

            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/products`
            );
            setProducts(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchOrders();
        fetchProducts();

    }, []);

    // LOW STOCK PRODUCTS

    const lowStockProducts = products.filter(
        (product) => product.stock <= 5
    );

    // NEW ORDERS

    const recentOrders = orders.slice(0, 5);

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-4xl font-bold mb-10">
                    Dashboard
                </h1>

                {/* TOP CARDS */}

                <div className="grid md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white p-8 rounded-2xl shadow">

                        <h2 className="text-gray-500 text-lg">
                            Total Products
                        </h2>

                        <p className="text-5xl font-bold text-green-600 mt-4">
                            {products.length}
                        </p>

                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow">

                        <h2 className="text-gray-500 text-lg">
                            Total Orders
                        </h2>

                        <p className="text-5xl font-bold text-blue-600 mt-4">
                            {orders.length}
                        </p>

                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow">

                        <h2 className="text-gray-500 text-lg">
                            Low Stock Alerts
                        </h2>

                        <p className="text-5xl font-bold text-red-500 mt-4">
                            {lowStockProducts.length}
                        </p>

                    </div>

                </div>

                {/* ALERT SECTIONS */}

                <div className="grid lg:grid-cols-2 gap-8">

                    {/* NEW ORDERS */}

                    <div className="bg-white rounded-2xl shadow p-8">

                        <h2 className="text-3xl font-bold mb-6">
                            New Orders
                        </h2>

                        <div className="space-y-5">

                            {recentOrders.map((order) => (

                                <div
                                    key={order._id}
                                    className="border rounded-xl p-4"
                                >

                                    <div className="flex justify-between">

                                        <div>

                                            <h3 className="font-bold text-lg">
                                                Order #{order._id.slice(-6)}
                                            </h3>

                                            <p className="text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <p className="font-bold text-green-600 text-xl">
                                                ₹{order.totalAmount}
                                            </p>

                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                {order.orderStatus}
                                            </span>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* LOW STOCK */}

                    <div className="bg-white rounded-2xl shadow p-8">

                        <h2 className="text-3xl font-bold mb-6">
                            Low Stock Alerts
                        </h2>

                        <div className="space-y-5">

                            {lowStockProducts.map((product) => (

                                <div
                                    key={product._id}
                                    className="flex items-center gap-4 border rounded-xl p-4"
                                >

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-20 h-20 rounded-xl object-cover"
                                    />

                                    <div className="flex-1">

                                        <h3 className="text-xl font-bold">
                                            {product.name}
                                        </h3>

                                        <p className="text-gray-500">
                                            {product.category}
                                        </p>

                                    </div>

                                    <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
                                        {product.stock} Left
                                    </span>

                                </div>
                            ))}

                            {lowStockProducts.length === 0 && (

                                <p className="text-gray-500">
                                    No low stock products
                                </p>
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;