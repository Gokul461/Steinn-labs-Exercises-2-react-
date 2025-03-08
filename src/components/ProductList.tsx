import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./ProductFilter";
import CircularProgress from '../components/CircularSpinner';
import { Pagination } from "@heroui/react";
import { toUpper } from "lodash";
import { useQuery } from 'react-query';

type Product = {
  id: string;
  name: string;
  brand: string;
  rating: number;
  stock: number;
  discount: number;
  price: number;
  color: string;
  size: string;
  discounted: boolean;
  created_at: string;
};

type Metadata = {
  total_count: number;
  page: number;
  page_size: number;
  total_pages: number;
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const ProductList: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const [filters, setFilters] = useState({
    min_price: "" as number | "",
    max_price: "" as number | "",
    min_rating: "" as number | "",
    max_rating: "" as number | "",
    min_stock: "" as number | "",
    max_stock: "" as number | "",
    color: "",
    size: "",
    rating: 0 as number,
  });

  const [page, setPage] = useState<number>(1);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const fetchProducts = async () => {
    try {
      let query = new URLSearchParams();
      if (category) query.append("category", category);
      if (sortBy) query.append("sort_by", sortBy);
      if (sortOrder) query.append("sort_order", sortOrder);
      if (filters.min_price) query.append("min_price", filters.min_price.toString());
      if (filters.max_price) query.append("max_price", filters.max_price.toString());
      if (filters.min_rating) query.append("min_rating", filters.min_rating.toString());
      if (filters.max_rating) query.append("max_rating", filters.max_rating.toString());
      if (filters.min_stock) query.append("min_stock", filters.min_stock.toString());
      if (filters.max_stock) query.append("max_stock", filters.max_stock.toString());
      if (filters.color) query.append("color", filters.color);
      if (filters.size) query.append("size", toUpper(filters.size));

      query.append("page", page.toString());
      query.append("page_size", "10");

      const response = await fetch(
        `https://0261cadc-a144-4755-8dda-dc4b44fcef31.eu-west-1.cloud.genez.io/api/products?${query.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setMetadata(data.metadata);
      return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
      console.error("Fetching error:", error);
      return [];
    }
  };
  const { data: products = [], isLoading, error, refetch } = useQuery(
    ['products', category, page, sortBy, sortOrder, filters],() => fetchProducts(),{ keepPreviousData: true }
  );

  useEffect(() => {
    refetch();
  }, [page, sortBy, sortOrder, filters, refetch]);

  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <Sidebar filters={filters} setFilters={setFilters} />
        <div className="flex-1 px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {category ? capitalize(category) : "All Products"}
          </h1>

          <div className="border-b pb-4 flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-semibold">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 p-2 pr-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="created_at">Newest</option>
              </select>
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition"
            >
              {sortOrder === "asc" ? (
                <>
                  <span className="font-bold">⬆</span> Ascending
                </>
              ) : (
                <>
                  <span className="font-bold">⬇</span> Descending
                </>
              )}
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center flex-col gap-4 items-center h-64">
              <CircularProgress />
              <p className="text-lg font-semibold text-gray-600">Loading products...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg font-semibold text-red-500">{(error as Error).message}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg font-semibold text-gray-500">No products found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {metadata && (
                <div className="flex justify-center mt-10 border-t-1 border-gray-200">
                  <Pagination
                    variant="bordered"
                    showControls
                    total={metadata.total_pages}
                    page={page}
                    onChange={(n) => setPage(n)}
                    className="border rounded-lg p-2 shadow-sm mt-4"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;