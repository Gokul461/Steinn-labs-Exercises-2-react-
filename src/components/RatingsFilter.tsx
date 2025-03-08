import { Star } from "lucide-react";

type RatingFilterProps = {
  filters: {
    min_rating: number | "";
  };
  setFilters: (filters: any) => void;
};

const RatingFilter: React.FC<RatingFilterProps> = ({ filters, setFilters }) => {
  const ratings = [4, 3, 2, 1];

  const handleRatingChange = (rating: number) => {
    setFilters({
      ...filters,
      min_rating: filters.min_rating === rating ? "" : rating,
    });
  };

  return (
    <div className="">
      <div className="space-y-3">
        {ratings.map((rating) => (
          <label
            key={rating}
            className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-200 rounded-lg cursor-pointer transition"
          >
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                className="w-5 h-5 accent-yellow-500"
                checked={filters.min_rating === rating}
                onChange={() => handleRatingChange(rating)}
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < rating ? "fill-yellow-500 text-yellow-500" : "fill-gray-300 text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-sm font-medium text-gray-700">{rating} & above</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
