import React from "react";
import dummy from "../assets/dummybox.webp";

type ProductProps = {
  product: {
    id: string;
    name: string;
    price: number;
    brand: string;
    rating: number;
    stock: number;
    color: string;
    size: string;
    discount: number;
  };
};

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-2xl p-4 border border-gray-200 transition-transform duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-lg">
      <div className="relative w-full h-40 flex justify-center items-center bg-gray-100 rounded-xl overflow-hidden">
        <img src={dummy} alt="dummy box" className="object-contain" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mt-4 line-clamp-1">{product.name}</h2>
      <div className="text-gray-600 text-xs mt-1">
        <p className="font-medium">Brand: <span className="font-semibold text-gray-800">{product.brand}</span></p>
        <p>Color: <span className="font-semibold">{product.color}</span></p>
        <p>Size: <span className="font-semibold">{product.size}</span></p>
      </div>
      <p className={`text-xs font-semibold mt-2 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
        {product.stock > 0 ? `In Stock (${product.stock} units)` : "Out of Stock"}
      </p>
      <div className="flex justify-between items-center mt-3">
        <p className="text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</p>
        <span className="text-xs font-medium px-3 py-1 bg-red-500 text-white rounded-lg">
          🔥 {product.discount}% OFF
        </span>
      </div>
      <div className="flex items-center mt-2">
        <span className="text-sm font-semibold text-gray-700">Rating:</span>
        <span className="ml-2 bg-yellow-200 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold">
          {product.rating} ⭐
        </span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
    </div>
  );
};

export default ProductCard;
