import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { ChevronRight, Search, Filter, RefreshCw, Users } from "lucide-react";
import { useState } from "react";

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: "order-placed" | "cooking-started" | "packaging" | "rider-assigned" | "arriving";
  date: string;
  location: string;
  assignedRider?: string;
}

const initialOrders: Order[] = [
  { id: "ORD-2024-001", customer: "John Smith", amount: 245.50, status: "arriving", date: "2024-01-15", location: "Lagos, Nigeria", assignedRider: "Ahmed Hassan" },
  { id: "ORD-2024-002", customer: "Sarah Johnson", amount: 189.99, status: "rider-assigned", date: "2024-01-14", location: "Abuja, Nigeria", assignedRider: "Chioma Okonkwo" },
  { id: "ORD-2024-003", customer: "Michael Chen", amount: 312.75, status: "packaging", date: "2024-01-14", location: "Ibadan, Nigeria", assignedRider: undefined },
  { id: "ORD-2024-004", customer: "Emma Wilson", amount: 156.30, status: "cooking-started", date: "2024-01-13", location: "Port Harcourt, Nigeria", assignedRider: undefined },
  { id: "ORD-2024-005", customer: "David Brown", amount: 425.00, status: "arriving", date: "2024-01-13", location: "Kano, Nigeria", assignedRider: "Emeka Eze" },
  { id: "ORD-2024-006", customer: "Lisa Anderson", amount: 298.50, status: "rider-assigned", date: "2024-01-12", location: "Enugu, Nigeria", assignedRider: "Fatima Muhammad" },
  { id: "ORD-2024-007", customer: "Robert Taylor", amount: 189.75, status: "cooking-started", date: "2024-01-12", location: "Calabar, Nigeria", assignedRider: undefined },
  { id: "ORD-2024-008", customer: "Jennifer Lee", amount: 512.00, status: "order-placed", date: "2024-01-11", location: "Benin City, Nigeria", assignedRider: undefined },
];

const riders = [
  "Ahmed Hassan",
  "Chioma Okonkwo",
  "Emeka Eze",
  "Fatima Muhammad",
  "John Okoro",
  "Mary Adeyemi",
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "order-placed":
      return "bg-red-100 text-red-800";
    case "cooking-started":
      return "bg-orange-100 text-orange-800";
    case "packaging":
      return "bg-yellow-100 text-yellow-800";
    case "rider-assigned":
      return "bg-blue-100 text-blue-800";
    case "arriving":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// const getStatusLabel = (status: string) => {
//   switch (status) {
//     case "order-placed":
//       return "Order Placed";
//     case "cooking-started":
//       return "Cooking Started";
//     case "packaging":
//       return "Packaging Food";
//     case "rider-assigned":
//       return "Rider Assigned";
//     case "arriving":
//       return "Arriving in few minutes";
//     default:
//       return status;
//   }
// };

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrderForRider, setSelectedOrderForRider] = useState<string | null>(null);

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleAssignRider = (orderId: string, riderName: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              assignedRider: riderName,
              status: "rider-assigned" as const,
            }
          : order
      )
    );
    setSelectedOrderForRider(null);
  };

  const handleReload = () => {
    setOrders(initialOrders);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground mt-1">Manage and view all customer orders.</p>
          </div>
          <button
            onClick={handleReload}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium w-full sm:w-auto justify-center sm:justify-start"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Reload</span>
          </button>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-foreground font-medium">
            <Filter className="w-5 h-5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rider</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground">{order.customer}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground text-sm">{order.location}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-primary">₦{order.amount.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value as Order["status"]
                          )
                        }
                        className={`px-3 py-1 text-xs font-medium rounded-full border-0 cursor-pointer transition-all ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <option value="order-placed">Order Placed</option>
                        <option value="cooking-started">Cooking Started</option>
                        <option value="packaging">Packaging Food</option>
                        <option value="rider-assigned">Rider Assigned</option>
                        <option value="arriving">Arriving in few minutes</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      {order.assignedRider ? (
                        <div className="flex items-center gap-2">
                          <span className="text-foreground text-sm">{order.assignedRider}</span>
                          <button
                            onClick={() => setSelectedOrderForRider(order.id)}
                            className="text-primary hover:underline text-xs font-medium"
                          >
                            Change
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedOrderForRider(order.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors text-sm font-medium"
                        >
                          <Users className="w-4 h-4" />
                          Assign
                        </button>
                      )}

                      {/* Rider Selection Dropdown */}
                      {selectedOrderForRider === order.id && (
                        <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-max">
                          {riders.map((rider) => (
                            <button
                              key={rider}
                              onClick={() => handleAssignRider(order.id, rider)}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-foreground"
                            >
                              {rider}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted-foreground text-sm">{order.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/order-details/${order.id}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{" "}
              <span className="font-medium">{orders.length}</span> results
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-white transition-colors text-sm font-medium text-foreground">
                Previous
              </button>
              <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-white transition-colors text-sm font-medium text-foreground">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
