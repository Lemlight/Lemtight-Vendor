import Layout from "../components/Layout";
import { Search, Filter, Plus, Edit2, Trash2, Star } from "lucide-react";
import { useState } from "react";

interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  available: boolean;
  description: string;
  sales: number;
}

const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    price: 8.99,
    category: "Burgers",
    rating: 4.8,
    image: "🍔",
    available: true,
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    sales: 342,
  },
  {
    id: "2",
    name: "Margherita Pizza",
    price: 12.99,
    category: "Pizza",
    rating: 4.9,
    image: "🍕",
    available: true,
    description: "Fresh mozzarella, basil, and tomato sauce on crispy crust",
    sales: 298,
  },
  {
    id: "3",
    name: "Caesar Salad",
    price: 9.99,
    category: "Salads",
    rating: 4.6,
    image: "🥗",
    available: true,
    description: "Crisp romaine lettuce with parmesan and croutons",
    sales: 156,
  },
  {
    id: "4",
    name: "Iced Latte",
    price: 4.99,
    category: "Beverages",
    rating: 4.7,
    image: "☕",
    available: true,
    description: "Cold brew coffee with creamy milk and ice",
    sales: 512,
  },
  {
    id: "5",
    name: "Spaghetti Carbonara",
    price: 13.99,
    category: "Pasta",
    rating: 4.8,
    image: "🍝",
    available: true,
    description: "Traditional pasta with bacon, egg, and parmesan",
    sales: 267,
  },
  {
    id: "6",
    name: "Chocolate Cake",
    price: 5.99,
    category: "Desserts",
    rating: 4.9,
    image: "🍰",
    available: true,
    description: "Rich chocolate cake with dark chocolate frosting",
    sales: 189,
  },
  {
    id: "7",
    name: "Grilled Chicken Sandwich",
    price: 10.99,
    category: "Sandwiches",
    rating: 4.7,
    image: "🥪",
    available: true,
    description: "Tender grilled chicken breast with garlic mayo",
    sales: 234,
  },
  {
    id: "8",
    name: "Vegetable Stir Fry",
    price: 11.99,
    category: "Vegetarian",
    rating: 4.5,
    image: "🥘",
    available: false,
    description: "Mixed vegetables with soy sauce and sesame oil",
    sales: 145,
  },
];

const categoryColors: Record<string, string> = {
  Burgers: "bg-red-100 text-red-800",
  Pizza: "bg-orange-100 text-orange-800",
  Salads: "bg-green-100 text-green-800",
  Beverages: "bg-blue-100 text-blue-800",
  Pasta: "bg-yellow-100 text-yellow-800",
  Desserts: "bg-pink-100 text-pink-800",
  Sandwiches: "bg-amber-100 text-amber-800",
  Vegetarian: "bg-emerald-100 text-emerald-800",
};

export default function Foods() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredItems = foodItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Foods</h1>
            <p className="text-muted-foreground mt-1">Manage your food menu and inventory.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium w-full sm:w-auto justify-center sm:justify-start">
            <Plus className="w-5 h-5" />
            <span>Add Food Item</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search foods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-foreground font-medium">
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 transition-colors border-l border-gray-200 ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl border-b border-gray-200">
                  {item.image}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col gap-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${categoryColors[item.category] || "bg-gray-100 text-gray-800"}`}>
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-foreground">{item.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="font-bold text-primary">₦{item.price.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Sales</p>
                      <p className="font-bold text-foreground">{item.sales}</p>
                    </div>
                  </div>

                  <div className={`px-2 py-1 rounded text-xs font-medium text-center ${
                    item.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {item.available ? "Available" : "Out of Stock"}
                  </div>
                </div>

                {/* Actions */}
                <div className="px-4 pb-4 flex gap-2 border-t border-gray-100 pt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Item</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rating</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Sales</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.image}</span>
                          <div>
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${categoryColors[item.category] || "bg-gray-100 text-gray-800"}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-primary">₦{item.price.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-foreground">{item.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-foreground font-medium">{item.sales}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                          item.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {item.available ? "Available" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-muted-foreground mb-4">No food items found matching your search.</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add First Item
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
