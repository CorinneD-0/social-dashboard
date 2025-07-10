import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashboardLayout() {
  const location = useLocation();
  const { user } = useSelector(state => state.auth);

  const navItems = [
    { path: "/feed", label: "Social Feed", icon: "📱" },
    { path: "/posts", label: "Post Planner", icon: "📝" },
    { path: "/analytics", label: "Analytics", icon: "��" },
    { path: "/profile-manager", label: "Profile Manager", icon: "✏️" },
    { path: "/admin", label: "Admin Panel", icon: "👑", adminOnly: true },
    { path: "/users", label: "Users", icon: "\ud83d\udc65" },
    { path: "/reports", label: "Reports", icon: "\ud83d\udcc8" },
    { path: "/notifications", label: "Notifications", icon: "\ud83d\udd14" },
  ].filter(item => !item.adminOnly || user?.role === 'admin');

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Gen Z */}
      <aside className="sidebar-genz w-64 p-6 space-y-6">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            🚀
          </div>
          <span className="text-xl font-display font-bold text-gradient-primary">
            SocialDash
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg transform scale-105"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="avatar-genz w-10 h-10">
              <img
                src="https://picsum.photos/200/200?random=1"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
              <div className="status-online"></div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                Laura Bianchi
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                @laura_bianchi
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 pt-24">
        <Outlet />
      </main>
    </div>
  );
}
