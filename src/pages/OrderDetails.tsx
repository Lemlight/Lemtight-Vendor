import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

interface OrderDetail {
  id: string;
  customer: string;
  email: string;
  phone: string;
  location: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: "order-placed" | "cooking-started" | "packaging" | "rider-assigned" | "arriving";
  date: string;
  assignedRider?: string;
}

const mockOrders: Record<string, OrderDetail> = {
  "ORD-2024-001": {
    id: "ORD-2024-001",
    customer: "John Smith",
    email: "john.smith@email.com",
    phone: "+234 801 234 5678",
    location: "Lagos, Nigeria",
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 12.99 },
      { name: "Caesar Salad", quantity: 1, price: 9.99 },
      { name: "Iced Latte", quantity: 2, price: 4.99 },
    ],
    subtotal: 245.50,
    deliveryFee: 50,
    total: 295.50,
    status: "arriving",
    date: "2024-01-15",
    assignedRider: "Ahmed Hassan",
  },
  "ORD-2024-002": {
    id: "ORD-2024-002",
    customer: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+234 802 345 6789",
    location: "Abuja, Nigeria",
    items: [
      { name: "Classic Burger", quantity: 3, price: 8.99 },
      { name: "Spaghetti Carbonara", quantity: 1, price: 13.99 },
    ],
    subtotal: 189.99,
    deliveryFee: 40,
    total: 229.99,
    status: "rider-assigned",
    date: "2024-01-14",
    assignedRider: "Chioma Okonkwo",
  },
};

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

const getStatusLabel = (status: string) => {
  switch (status) {
    case "order-placed":
      return "Order Placed";
    case "cooking-started":
      return "Cooking Started";
    case "packaging":
      return "Packaging Food";
    case "rider-assigned":
      return "Rider Assigned";
    case "arriving":
      return "Arriving in few minutes";
    default:
      return status;
  }
};

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetail | null>(
    mockOrders[id || ""] || null
  );
  const [showRiderDropdown, setShowRiderDropdown] = useState(false);

  if (!order) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Order not found</h1>
            <button
              onClick={() => navigate("/orders")}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleStatusChange = (newStatus: OrderDetail["status"]) => {
    setOrder({ ...order, status: newStatus });
  };

  const handleAssignRider = (riderName: string) => {
    setOrder({
      ...order,
      assignedRider: riderName,
      status: "rider-assigned",
    });
    setShowRiderDropdown(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/orders")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Order {order.id}</h1>
              <p className="text-muted-foreground mt-1">Placed on {order.date}</p>
            </div>
          </div>
          <select
            value={order.status}
            onChange={(e) =>
              handleStatusChange(e.target.value as OrderDetail["status"])
            }
            className={`px-4 py-2 text-sm font-medium rounded-lg border-0 cursor-pointer transition-all ${getStatusColor(
              order.status
            )}`}
          >
            <option value="order-placed">Order Placed</option>
            <option value="cooking-started">Cooking Started</option>
            <option value="packaging">Packaging Food</option>
            <option value="rider-assigned">Rider Assigned</option>
            <option value="arriving">Arriving in few minutes</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-4">Customer Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="text-lg font-semibold text-foreground">{order.customer}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="text-foreground">{order.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="text-foreground">{order.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-2 border-t border-gray-100">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Delivery Location</p>
                    <p className="text-foreground">{order.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-4">Order Items</h2>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-primary">₦{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rider Assignment */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4">Rider Assignment</h2>
              {order.assignedRider ? (
                <div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-green-800 mb-1">Assigned To</p>
                    <p className="text-lg font-semibold text-green-900">{order.assignedRider}</p>
                  </div>
                  <button
                    onClick={() => setShowRiderDropdown(!showRiderDropdown)}
                    className="w-full px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm"
                  >
                    Change Rider
                  </button>
                  {showRiderDropdown && (
                    <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-56">
                      {riders.map((rider) => (
                        <button
                          key={rider}
                          onClick={() => handleAssignRider(rider)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-foreground border-b border-gray-100 last:border-b-0"
                        >
                          {rider}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">No rider assigned yet</p>
                  <button
                    onClick={() => setShowRiderDropdown(!showRiderDropdown)}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                  >
                    Assign Rider
                  </button>
                  {showRiderDropdown && (
                    <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-56">
                      {riders.map((rider) => (
                        <button
                          key={rider}
                          onClick={() => handleAssignRider(rider)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-foreground border-b border-gray-100 last:border-b-0"
                        >
                          {rider}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-semibold text-foreground">₦{order.subtotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <p className="text-muted-foreground">Delivery Fee</p>
                  <p className="font-semibold text-foreground">₦{order.deliveryFee.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between py-3 bg-primary/5 rounded-lg px-3">
                  <p className="font-semibold text-foreground">Total</p>
                  <p className="text-xl font-bold text-primary">₦{order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Order Status Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4">Status Timeline</h2>
              <div className="space-y-3">
                {[
                  "order-placed",
                  "cooking-started",
                  "packaging",
                  "rider-assigned",
                  "arriving",
                ].map((status, index) => (
                  <div key={status} className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full flex-shrink-0 ${
                        (
                          [
                            "order-placed",
                            "cooking-started",
                            "packaging",
                            "rider-assigned",
                            "arriving",
                          ] as const
                        ).indexOf(order.status as any) >= index
                          ? "bg-primary"
                          : "bg-gray-300"
                      }`}
                    />
                    <p
                      className={`text-sm ${
                        (
                          [
                            "order-placed",
                            "cooking-started",
                            "packaging",
                            "rider-assigned",
                            "arriving",
                          ] as const
                        ).indexOf(order.status as any) >= index
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {getStatusLabel(status)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
