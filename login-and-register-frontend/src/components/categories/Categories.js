import React, { useState, useEffect } from "react";
import carsData from "../../api/cars.json";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom";
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://localhost:3001/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const addCategory = () => {
    axios
      .post("http://localhost:3001/api/categories", newCategory)
      .then((response) => {
        console.log("Category added:", response.data);
        setNewCategory({ name: "", description: "" });
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  const handleDelete = (categoryId) => {
    axios
      .delete(`http://localhost:3001/api/categories/${categoryId}`)
      .then((response) => {
        console.log("Car deleted:", response.data);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Categories
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them man bun deep jianbing selfies heirloom.
            </p>
          </div>
          <div className="text-gray-900 text-lg title-font font-medium  my-5">
            <div className="flex justify-end">
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                value={newCategory.name}
                onChange={handleInputChange}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                name="description"
                placeholder="Category Description"
                value={newCategory.description}
                onChange={handleInputChange}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={addCategory}
                className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none">
                Add
              </button>
            </div>
          </div>
          <div className="flex flex-wrap -m-4 mt-5 border">
            {categories.map((category) => (
              <div className="lg:w-1/3 sm:w-1/2 p-4 " key={category._id}>
                <div className="flex relative border border-yellow-500">
                  <h1 className="text-4xl absolute inset-0 w-full h-full object-cover object-center border flex justify-center items-center">
                    {category.name}
                  </h1>
                  <div className="px-8 py-10 relative z-10 w-full border-4 border-yellow-500 bg-white opacity-0 hover:opacity-100">
                    <button
                      className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-red-500"
                      onClick={() => handleDelete(category._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {category.name}
                    </h1>
                    <p className="leading-relaxed">{category.description}</p>
                    <Link
                      to={{
                        pathname: "/spareparts",
                        state: { categoryName: category.name },
                      }} class="mt-3 text-yellow-500 inline-flex items-center">
                      Cars
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4 ml-2"
                        viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryList;
