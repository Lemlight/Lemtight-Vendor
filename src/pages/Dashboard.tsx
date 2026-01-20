import Layout from "../components/Layout";
import {
  // LineChart,
  // Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react";

const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
];

const ordersData = [
  { name: "Week 1", orders: 45 },
  { name: "Week 2", orders: 62 },
  { name: "Week 3", orders: 38 },
  { name: "Week 4", orders: 71 },
];

const categoryData = [
  { name: "Food", value: 45 },
  { name: "Beverages", value: 30 },
  { name: "Desserts", value: 25 },
];

const COLORS = ["#077a69", "#fbcb32", "#0a9b7f"];

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hi Daniel G, 👋</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your vendor dashboard.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            icon={<DollarSign className="w-6 h-6" />}
            title="Total Revenue"
            value="₦45,231"
            change="+12.5%"
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <KPICard
            icon={<ShoppingCart className="w-6 h-6" />}
            title="Total Orders"
            value="1,234"
            change="+8.2%"
            bgColor="bg-green-50"
            iconColor="text-green-600"
          />
          <KPICard
            icon={<Users className="w-6 h-6" />}
            title="Total Customers"
            value="856"
            change="+5.1%"
            bgColor="bg-purple-50"
            iconColor="text-purple-600"
          />
          <KPICard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Growth Rate"
            value="23.5%"
            change="+3.2%"
            bgColor="bg-orange-50"
            iconColor="text-orange-600"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#077a69" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#077a69" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "8px" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#077a69"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Orders Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Orders</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "8px" }}
                />
                <Bar dataKey="orders" fill="#fbcb32" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-foreground mb-4">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${entry}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Orders Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-sm text-foreground">Order #{2001 + i}</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <span className="font-semibold text-primary">₦{150 + i * 25}.00</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface KPICardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  bgColor: string;
  iconColor: string;
}

function KPICard({ icon, title, value, change, bgColor, iconColor }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all">
      <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{title}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-green-600 mt-2 font-medium">↑ {change}</p>
    </div>
  );
}
