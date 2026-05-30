import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../component/Sidebar";

function Products() {

    const [products, setProducts] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [formData, setFormData] =
        useState({

            name: "",
            category: "",
            price: "",
            image: "",
            description: "",
            stock: "",
            unit: "",

        });

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

        fetchProducts();

    }, []);

    // HANDLE CHANGE

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });
    };

    // ADD PRODUCT

    const addProduct = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/products`,
                formData
            );

            resetForm();

            fetchProducts();

        } catch (error) {

            console.log(error);
        }
    };

    // DELETE PRODUCT

    const deleteProduct = async (id) => {

        try {

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/products/${id}`
            );

            fetchProducts();

        } catch (error) {

            console.log(error);
        }
    };

    // EDIT PRODUCT

    const editProduct = (product) => {

        setEditingId(product._id);

        setFormData({

            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            description: product.description,
            stock: product.stock,
            unit: product.unit,

        });
    };

    // UPDATE PRODUCT

    const updateProduct = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/products/${editingId}`,
                formData
            );

            setEditingId(null);

            resetForm();

            fetchProducts();

        } catch (error) {

            console.log(error);
        }
    };

    // RESET FORM

    const resetForm = () => {

        setFormData({

            name: "",
            category: "",
            price: "",
            image: "",
            description: "",
            stock: "",
            unit: "",

        });
    };

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-4xl font-bold mb-8">
                    Product Management
                </h1>

                {/* FORM */}

                <form
                    onSubmit={
                        editingId
                            ? updateProduct
                            : addProduct
                    }
                    className="bg-white p-8 rounded-3xl shadow-md mb-10 grid md:grid-cols-2 gap-6"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-4 rounded-2xl"
                        required
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border p-4 rounded-2xl"
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border p-4 rounded-2xl"
                        required
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="border p-4 rounded-2xl"
                        required
                    />

                    <input
                        type="text"
                        name="unit"
                        placeholder="Unit (kg/piece/litre)"
                        value={formData.unit}
                        onChange={handleChange}
                        className="border p-4 rounded-2xl"
                        required
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        className="border p-4 rounded-2xl"
                        required
                    />

                    <textarea
                        rows="4"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-4 rounded-2xl md:col-span-2"
                        required
                    />

                    <button
                        type="submit"
                        className={`py-4 rounded-2xl text-white text-lg font-semibold md:col-span-2 transition ${editingId
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-[#398f8d] hover:bg-[#2f7775]"
                            }`}
                    >

                        {editingId
                            ? "Update Product"
                            : "Add Product"}

                    </button>

                </form>

                {/* PRODUCT LIST */}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {products.map((product) => (

                        <div
                            key={product._id}
                            className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition"
                        >

                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-6">

                                <div className="flex justify-between items-center">

                                    <h2 className="text-2xl font-bold">
                                        {product.name}
                                    </h2>

                                    <span className="bg-[#398f8d]/10 text-[#398f8d] px-3 py-1 rounded-full text-sm">
                                        {product.category}
                                    </span>

                                </div>

                                <p className="text-gray-500 mt-4 leading-7">
                                    {product.description}
                                </p>

                                {/* PRICE */}

                                <p className="text-3xl font-bold text-[#398f8d] mt-5">
                                    ₹{product.price}/{product.unit}
                                </p>

                                {/* STOCK */}

                                <div className="mt-5">

                                    {product.stock <= 0 ? (

                                        <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full">
                                            Out Of Stock
                                        </span>

                                    ) : product.stock <= 5 ? (

                                        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                                            Low Stock ({product.stock})
                                        </span>

                                    ) : (

                                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                                            In Stock ({product.stock})
                                        </span>

                                    )}

                                </div>

                                {/* BUTTONS */}

                                <div className="flex gap-4 mt-7">

                                    <button
                                        onClick={() =>
                                            editProduct(product)
                                        }
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteProduct(product._id)
                                        }
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl transition"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default Products;