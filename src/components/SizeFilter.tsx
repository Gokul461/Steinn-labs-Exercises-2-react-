import React from "react";

type SizeFilterProps = {
  filters: {
    size: string | "";
  };
  setFilters: (filters: any) => void;
};

const SizeFilter: React.FC<SizeFilterProps> = ({ filters, setFilters }) => {
  const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

  const handleSizeChange = (size: string) => {
    setFilters({
      ...filters,
      size: filters.size === size ? "" : size,
    });
  };

  return (
    <div className="p-5 border border-gray-300 rounded-lg shadow-md bg-white w-full">
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <label
            key={size}
            className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-all border 
            ${
              filters.size === size
                ? " bg-gradient-to-l to-purple-500 from-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={filters.size === size}
              onChange={() => handleSizeChange(size)}
            />
            {size}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SizeFilter;
