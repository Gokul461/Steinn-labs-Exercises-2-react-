type ColorFilterProps = {
    filters: {
      color: string;
    };
    setFilters: (filters: {
      color: string;
    }) => void;
  };
const ColorFilter: React.FC<ColorFilterProps> = ({ filters, setFilters }) => {
    const Availablecolors = ["Red", "Blue", "Yellow", "Black", "White","green", "Purple", "Orange", "Pink", "Gray"];
  
    const handleColorChange = (c: string) => {
      setFilters({ ...filters, color: c });
    };
  
    return (
      <div className="p-4 border rounded-lg shadow-lg bg-white mb-3">
        <h2 className="text-lg font-semibold mb-3">Select Colors</h2>
        <div className="flex flex-wrap gap-3">

          {Availablecolors.map((c) => (
            <label key={c} className="relative cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={filters.color === c}
                onChange={(e) => handleColorChange(e.target.checked ? c : "")}
              />
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${filters.color === c ? "border-gray-600 shadow-md scale-110" : "border-gray-600"}
                transition-all duration-200 ease-in-out`}
                style={{ backgroundColor: c.toLowerCase() }}
              >
                {filters.color === c && (
                  <span className="text-white font-bold text-xs">✔</span>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  };
  
  export default ColorFilter;
  