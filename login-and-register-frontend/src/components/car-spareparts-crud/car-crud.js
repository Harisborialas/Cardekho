import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Homepage from "../homepage/homepage";

const CarCRUD = () => {
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [newCategory, setNewCategory] = useState({
    color: "",
    model: "",
    make: "",
    registrationNo: "",
  });
  const categoryName = location.state ? location.state.categoryName : "";

  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };
  const fetchCategories = () => {
    axios
      .get("http://localhost:3001/api/cars")
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleAddCar = (e) => {
    axios
      .post("http://localhost:3001/api/cars", newCategory)
      .then((response) => {
        console.log("Category added:", response.data);
        setNewCategory({
          color: "",
          model: "",
          make: "",
          registrationNo: "",
        });
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };
  const handleDelete = (categoryId) => {
    axios
      .delete(`http://localhost:3001/api/cars/${categoryId}`)
      .then((response) => {
        console.log("Category deleted:", response.data);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };
  const totalCars = cars.length;

  return (
    <>
      {/* <Navbar /> */}
      <Homepage totalCars={cars.length} />
      <div className="container mx-auto p-4">
        <section class="text-gray-600 body-font">
          <div class="container px-5  mx-auto">
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-20">
              Cars Lists
              <br class="hidden sm:block" />
              <span className="sm:text-2xl  font-small title-font text-center text-gray-400 text-gray-900 mb-20">
                Here are some new cars
              </span>
            </h1>
            <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
              {cars.map((car, index) => (
                <div class="p-4 md:w-1/3 flex border border-yellow-500">
                
                  <div class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4 flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-6 h-6"
                      viewBox="0 0 24 24">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <div class="flex-grow pl-6">
                    <h2 className="text-gray-900 text-lg title-font font-medium mb-2 flex justify-between">
                      {categoryName}
                      <button
                        className=" text-red-500"
                        onClick={() => handleDelete(car._id)}>
                        Delete
                      </button>
                    </h2>
                    <p class="leading-relaxed my-3 text-base">
                      Color: {car.color}
                    </p>
                    <p class="leading-relaxed text-base">Make: {car.make}</p>
                    <a class="mt-3 inline-flex items-center">
                      Registration NO: {car.registrationNo}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Create Car */}
        <div className="my-24">
          <h2 className="text-xl font-bold mb-2">Create</h2>
          <form className="bg-white border rounded p-2" onSubmit={handleAddCar}>
            <div className="mb-2">
              <label htmlFor="color" className="block mb-1">
                Color:
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={cars.color}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="model" className="block mb-1">
                Model:
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={cars.model}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="make" className="block mb-1">
                Make:
              </label>
              <input
                type="text"
                id="make"
                name="make"
                value={cars.make}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="registrationNo" className="block mb-1">
                Registration No:
              </label>
              <input
                type="text"
                id="registrationNo"
                name="registrationNo"
                value={cars.registrationNo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Car
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CarCRUD;
