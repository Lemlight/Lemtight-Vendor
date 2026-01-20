import { Menu, X, Search, Bell, Settings } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function Header({ onMenuClick, sidebarOpen }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
      {/* Left Side */}
      <div className="flex items-center gap-4 flex-1">
        {/* Menu Toggle for Mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md bg-gray-100 rounded-lg px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative text-gray-600">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Settings */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
          <Settings className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-foreground">Daniel G</p>
            <p className="text-xs text-muted-foreground">Vendor</p>
          </div>
          <div className="w-10 h-10 bg-[#077a69] rounded-full flex items-center justify-center text-white font-bold">
            DG
          </div>
        </div>
      </div>
    </header>
  );
}
