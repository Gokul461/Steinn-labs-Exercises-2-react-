import React from "react";
import PriceSlider from "./PriceSlider";
import ColorFilter from "./ColorFilter";
import RatingFilter from "./RatingsFilter";
import SizeFilter from "./SizeFilter";
type SidebarProps = {
  filters: {
    min_price: number | "";
    max_price: number | "";
    min_rating: number | "";
    max_rating: number | "";
    min_stock: number | "";
    max_stock: number | "";
    color: string;
    size: string;
  };
  setFilters: (filters: any) => void;

};
 
const ProductFilter: React.FC<SidebarProps> = ({ filters, setFilters}) => {
  return (
    <div className="w-72 p-6 bg-gray-100 mb-4 h-auto bg-opacity-50 backdrop-blur-xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6"> Filters</h2>
      <label className="block text-gray-700 font-semibold mb-2">Set Budget </label>
      <PriceSlider filters={filters} setFilters={setFilters} />
      <label className="block text-gray-700 font-semibold mb-2">Ratings </label>
      <div className="flex space-x-3 mb-4">
       
      <RatingFilter filters={filters} setFilters={setFilters}/>
      </div>
      <label className="block text-gray-700 font-semibold mb-2"> Stock </label>
      <div className="flex space-x-3 mb-4">
        <input
          type="number"
          placeholder="Required stock"
          className="w-30 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          value={filters.min_stock}
          onChange={(e) => setFilters({ ...filters, min_stock: e.target.value })}
        />
      </div>
      <label className="block text-gray-700 font-semibold mb-2"> Color</label>
      <ColorFilter filters={filters} setFilters={setFilters} />
      <label className="block text-gray-700 font-semibold mb-2"> Size</label>
     <SizeFilter filters={filters} setFilters={setFilters} />

      
    </div>
  );
};

export default ProductFilter;
