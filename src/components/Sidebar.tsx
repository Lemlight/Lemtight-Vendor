import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  BarChart3,
  MessageSquare,
  Wallet,
  Star,
  Calendar,
  UtensilsCrossed,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Orders", path: "/orders", icon: ShoppingCart },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Foods", path: "/foods", icon: UtensilsCrossed },
  { name: "Customers", path: "/customers", icon: Users },
  { name: "Reviews", path: "/reviews", icon: Star },
  { name: "Calendar", path: "/calendar", icon: Calendar },
  { name: "Chat", path: "/chat", icon: MessageSquare },
  { name: "Wallet", path: "/wallet", icon: Wallet },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/50" />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${collapsed ? "w-20" : "w-64"} md:hover:w-64 group`}
      >
        {/* Logo */}
        <div className={`p-6 border-b border-gray-200 flex items-center justify-between ${collapsed ? "px-3" : ""}`}>
          <div className={`flex items-center gap-2 ${collapsed ? "hidden group-hover:flex" : ""}`}>
            <div className="w-8 h-8 bg-[#077a69] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            {/* <span className="text-xl font-bold text-foreground">Vendor</span> */}
          </div>
          {collapsed && (
            <div className="w-8 h-8 bg-[#077a69] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hidden md:block"
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all relative group/item ${
                      isActive
                        ? "bg-[#077a69] text-white shadow-md"
                        : "text-foreground hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="text-sm">{item.name}</span>
                        {isActive && (
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                      </>
                    )}

                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity z-50">
                        {item.name}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t border-gray-200 ${collapsed ? "px-2" : ""}`}>
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">🍴</p>
                <p className="text-xs text-muted-foreground truncate">vendor@vendor.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
