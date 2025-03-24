import React from "react";
import { useQuery } from "react-query"; 
import { useNavigate } from "react-router-dom";
import CircularProgress from "../components/CircularSpinner";
import SwiperComponent from "../components/SwiperComponent";

const Category: React.FC = () => {
  const navigate = useNavigate();

  const fetchCategory = async (): Promise<string[]> => {
    const response = await fetch(
      "https://0261cadc-a144-4755-8dda-dc4b44fcef31.eu-west-1.cloud.genez.io/api/categories"
    );
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    return Array.isArray(data.data) ? data.data : [];
  }
  const { data: categories = [], isLoading, error } = useQuery(["categories"],fetchCategory);
  return (
    <div className="bg-gradient-to-r from-purple-100 via-purple-50 to-purple-200 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="border-b h-16 mb-8 shadow-lg rounded-2xl border-gray-200 backdrop-blur-lg">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
            ✨ Explore Categories
          </h1>
        </div>
        <div className="mb-12">
          <SwiperComponent />
        </div>

        {isLoading ? (
          <div className="flex justify-center flex-col gap-4 items-center h-64">
            <CircularProgress />
            <p className="text-xl font-medium text-gray-700 animate-pulse">
              Loading categories...
            </p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg font-semibold text-red-500">
              {(error as Error).message}
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg font-semibold text-gray-500">
              No categories found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((category: string) => (
              <button
                key={category}
                className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-300
                           hover:border-purple-700 transition-all duration-300 transform hover:scale-105 
                           flex flex-col items-center justify-center gap-3 
                           hover:shadow-xl hover:bg-gradient-to-br from-purple-100 to-purple-200"
                onClick={() => navigate(`/category/products/${category}`)}
                aria-label={`Explore ${category}`}
              >
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition">
                  {category}
                </h2>
                <span className="text-xs text-gray-500 transition">
                  Click to explore →
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
