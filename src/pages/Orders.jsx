import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from '../component/Sidebar'
function Orders() {

    const [orders, setOrders] =
        useState([]);

    // FETCH ORDERS

    const fetchOrders = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/orders"
            );

            setOrders(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchOrders();

    }, []);

    // UPDATE STATUS

    const updateStatus = async (
        id,
        status
    ) => {

        try {

            await axios.put(
                `http://localhost:5000/api/orders/status/${id}`,
                {
                    orderStatus: status,
                }
            );

            fetchOrders();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-4xl font-bold mb-8">
                    Orders Management
                </h1>

                <div className="space-y-6">

                    {orders.map((order) => (

                        <div
                            key={order._id}
                            className="bg-white rounded-2xl shadow p-6"
                        >

                            {/* TOP */}

                            <div className="flex flex-col lg:flex-row justify-between gap-6">

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        Order #{order._id.slice(-6)}
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        User ID: {order.userId}
                                    </p>

                                    <p className="mt-2">
                                        Payment:
                                        <span className="font-semibold ml-2">
                                            {order.paymentMethod}
                                        </span>
                                    </p>

                                    <p>
                                        Payment Status:
                                        <span className="font-semibold ml-2">
                                            {order.paymentStatus}
                                        </span>
                                    </p>

                                </div>

                                <div>

                                    <p className="text-3xl font-bold text-green-600">
                                        ₹{order.totalAmount}
                                    </p>

                                    <div className="mt-3">

                                        <span className={`px-4 py-2 rounded-full text-white ${order.orderStatus === "Pending"
                                            ? "bg-yellow-500"
                                            : order.orderStatus === "Packed"
                                                ? "bg-blue-500"
                                                : order.orderStatus === "Shipped"
                                                    ? "bg-purple-500"
                                                    : order.orderStatus === "Delivered"
                                                        ? "bg-green-600"
                                                        : "bg-red-500"
                                            }`}>
                                            {order.orderStatus}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* ADDRESS */}

                            <div className="mt-6">

                                <h3 className="font-bold text-lg">
                                    Delivery Address
                                </h3>

                                <p className="text-gray-600 mt-2">
                                    {order.deliveryAddress}
                                </p>

                            </div>

                            {/* ITEMS */}

                            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                                {order.items.map((item, index) => (

                                    <div
                                        key={index}
                                        className="border rounded-xl p-4 flex gap-4"
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 rounded-lg object-cover"
                                        />

                                        <div>

                                            <h3 className="font-bold">
                                                {item.name}
                                            </h3>

                                            <p>
                                                Qty: {item.quantity}
                                            </p>

                                            <p className="text-green-600 font-bold">
                                                ₹{item.price}
                                            </p>

                                        </div>

                                    </div>
                                ))}

                            </div>

                            {/* STATUS BUTTONS */}

                            {order.orderStatus !== "Cancelled" &&
                                order.orderStatus !== "Delivered" && (

                                    <div className="flex flex-wrap gap-4 mt-8">

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order._id,
                                                    "Packed"
                                                )
                                            }
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
                                        >
                                            Packed
                                        </button>

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order._id,
                                                    "Shipped"
                                                )
                                            }
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl"
                                        >
                                            Shipped
                                        </button>

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order._id,
                                                    "Delivered"
                                                )
                                            }
                                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
                                        >
                                            Delivered
                                        </button>

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order._id,
                                                    "Cancelled"
                                                )
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
                                        >
                                            Cancel
                                        </button>

                                    </div>
                                )}

                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}

export default Orders;