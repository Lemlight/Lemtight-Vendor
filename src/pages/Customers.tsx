import Layout from "../components/Layout";
import { Search, Filter, Plus, Edit2, Trash2, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: "active" | "inactive";
  joinDate: string;
  location: string;
}

const customers: Customer[] = [
  {
    id: "CUST-001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+234 801 234 5678",
    totalOrders: 12,
    totalSpent: 45230,
    lastOrder: "2024-01-15",
    status: "active",
    joinDate: "2023-06-12",
    location: "Lagos, Nigeria",
  },
  {
    id: "CUST-002",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+234 802 345 6789",
    totalOrders: 8,
    totalSpent: 32450,
    lastOrder: "2024-01-14",
    status: "active",
    joinDate: "2023-08-20",
    location: "Abuja, Nigeria",
  },
  {
    id: "CUST-003",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+234 803 456 7890",
    totalOrders: 15,
    totalSpent: 58920,
    lastOrder: "2024-01-13",
    status: "active",
    joinDate: "2023-05-10",
    location: "Ibadan, Nigeria",
  },
  {
    id: "CUST-004",
    name: "Emma Wilson",
    email: "emma.w@email.com",
    phone: "+234 804 567 8901",
    totalOrders: 5,
    totalSpent: 18750,
    lastOrder: "2024-01-10",
    status: "active",
    joinDate: "2023-11-15",
    location: "Port Harcourt, Nigeria",
  },
  {
    id: "CUST-005",
    name: "David Brown",
    email: "david.b@email.com",
    phone: "+234 805 678 9012",
    totalOrders: 20,
    totalSpent: 78650,
    lastOrder: "2024-01-08",
    status: "inactive",
    joinDate: "2023-03-22",
    location: "Kano, Nigeria",
  },
  {
    id: "CUST-006",
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    phone: "+234 806 789 0123",
    totalOrders: 9,
    totalSpent: 35420,
    lastOrder: "2024-01-12",
    status: "active",
    joinDate: "2023-07-08",
    location: "Enugu, Nigeria",
  },
  {
    id: "CUST-007",
    name: "Robert Taylor",
    email: "robert.t@email.com",
    phone: "+234 807 890 1234",
    totalOrders: 11,
    totalSpent: 42300,
    lastOrder: "2024-01-11",
    status: "active",
    joinDate: "2023-09-14",
    location: "Calabar, Nigeria",
  },
  {
    id: "CUST-008",
    name: "Jennifer Lee",
    email: "jen.lee@email.com",
    phone: "+234 808 901 2345",
    totalOrders: 7,
    totalSpent: 28950,
    lastOrder: "2024-01-09",
    status: "active",
    joinDate: "2023-10-20",
    location: "Benin City, Nigeria",
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customers</h1>
            <p className="text-muted-foreground mt-1">Manage and view all your customers.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium w-full sm:w-auto justify-center sm:justify-start">
            <Plus className="w-5 h-5" />
            <span>Add Customer</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Customers</p>
            <p className="text-2xl font-bold text-foreground">{customers.length}</p>
            <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-muted-foreground mb-1">Active Customers</p>
            <p className="text-2xl font-bold text-foreground">{customers.filter((c) => c.status === "active").length}</p>
            <p className="text-xs text-green-600 mt-2">↑ 8% engagement</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-primary">₦{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-2">↑ 15% growth</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-muted-foreground mb-1">Avg Order Value</p>
            <p className="text-2xl font-bold text-primary">₦{Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalOrders, 0)).toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-2">↑ 5% increase</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <div className="p-6">
                  {/* Avatar and Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {getInitials(customer.name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{customer.name}</h3>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                          customer.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {customer.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-muted-foreground truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-foreground">{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-foreground">{customer.location}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Orders</p>
                      <p className="font-bold text-foreground text-lg">{customer.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Spent</p>
                      <p className="font-bold text-primary">₦{customer.totalSpent.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Last Order */}
                  <div className="text-xs text-muted-foreground mb-4">
                    Last order: <span className="text-foreground font-medium">{customer.lastOrder}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Orders</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total Spent</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                            {getInitials(customer.name)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">{customer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-foreground text-sm">{customer.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-foreground text-sm">{customer.location}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-foreground">{customer.totalOrders}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-primary">₦{customer.totalSpent.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                            customer.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {customer.status === "active" ? "Active" : "Inactive"}
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
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-muted-foreground mb-4">No customers found matching your search.</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add First Customer
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
