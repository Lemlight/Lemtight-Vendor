import Layout from "../components/Layout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from "recharts";
import { TrendingUp, Calendar, Download } from "lucide-react";

const salesTrendData = [
  { date: "Jan 1", sales: 4000, orders: 24, customers: 120 },
  { date: "Jan 8", sales: 3000, orders: 18, customers: 95 },
  { date: "Jan 15", sales: 2000, orders: 12, customers: 78 },
  { date: "Jan 22", sales: 2780, orders: 20, customers: 110 },
  { date: "Jan 29", sales: 1890, orders: 14, customers: 85 },
  { date: "Feb 5", sales: 2390, orders: 16, customers: 92 },
  { date: "Feb 12", sales: 3490, orders: 22, customers: 125 },
];

const productPerformance = [
  { name: "Burgers", sales: 4200, revenue: 12600 },
  { name: "Pizza", sales: 3800, revenue: 11400 },
  { name: "Pasta", sales: 3200, revenue: 9600 },
  { name: "Salads", sales: 2800, revenue: 8400 },
  { name: "Beverages", sales: 3500, revenue: 5250 },
];

const hourlyTraffic = [
  { hour: "12 AM", traffic: 400 },
  { hour: "3 AM", traffic: 150 },
  { hour: "6 AM", traffic: 300 },
  { hour: "9 AM", traffic: 800 },
  { hour: "12 PM", traffic: 1200 },
  { hour: "3 PM", traffic: 1500 },
  { hour: "6 PM", traffic: 1800 },
  { hour: "9 PM", traffic: 1400 },
];

const customerMetrics = [
  { metric: "Total Revenue", value: "₦125,430", change: "+12.5%", color: "text-blue-600" },
  { metric: "Avg Order Value", value: "₦85.50", change: "+5.3%", color: "text-green-600" },
  { metric: "Conversion Rate", value: "3.24%", change: "+0.8%", color: "text-purple-600" },
  { metric: "Customer Lifetime Value", value: "₦450", change: "+15.2%", color: "text-orange-600" },
];

export default function Analytics() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">Track your business performance and insights.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-foreground font-medium">
              <Calendar className="w-5 h-5" />
              <span className="hidden sm:inline">Date Range</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerMetrics.map((item, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm text-muted-foreground mb-2">{item.metric}</p>
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <p className={`text-sm mt-2 font-medium ${item.color}`}>↑ {item.change}</p>
            </div>
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Trend - Large Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-foreground mb-4">Sales Trend</h3>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={salesTrendData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#077a69" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#077a69" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#999" />
                <YAxis stroke="#999" yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "8px" }}
                />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  fill="url(#colorSales)"
                  stroke="#077a69"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#fbcb32"
                  strokeWidth={2}
                  dot={{ fill: "#fbcb32", r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-foreground mb-4">Peak Hours</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={hourlyTraffic} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#999" />
                <YAxis dataKey="hour" type="category" width={60} stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "8px" }}
                />
                <Bar dataKey="traffic" fill="#077a69" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4">Product Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis yAxisId="left" stroke="#999" />
              <YAxis yAxisId="right" orientation="right" stroke="#999" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "8px" }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="sales" fill="#077a69" radius={[8, 8, 0, 0]} />
              <Bar yAxisId="right" dataKey="revenue" fill="#fbcb32" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Metrics Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Week</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Sales</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Orders</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Customers</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Avg Order Value</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Growth</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { week: "Week 1", sales: "₦8,500", orders: "45", customers: "120", aov: "₦188.89", growth: "+12.5%" },
                  { week: "Week 2", sales: "₦9,200", orders: "52", customers: "135", aov: "₦176.92", growth: "+8.2%" },
                  { week: "Week 3", sales: "₦7,800", orders: "38", customers: "98", aov: "₦205.26", growth: "-15.2%" },
                  { week: "Week 4", sales: "₦10,150", orders: "58", customers: "145", aov: "₦175.00", growth: "+30.1%" },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{row.week}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary text-primary">{row.sales}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{row.orders}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{row.customers}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{row.aov}</td>
                    <td className={`px-6 py-4 text-sm font-medium ${row.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {row.growth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
