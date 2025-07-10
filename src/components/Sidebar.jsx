
import { BarChart3, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-white/20 dark:border-white/10 shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 px-8 py-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          🚀
        </div>
        <span className="text-2xl font-display font-bold text-gradient-primary">SocialDash</span>
      </div>
      <nav className="flex flex-col gap-2 px-4 mt-4">
        <NavLink to="/analytics" className={({isActive}) =>
          `flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold text-lg transition-all duration-200 group hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 hover:shadow-lg ${isActive ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-200'}`
        }>
          <BarChart3 size={28} className="rounded-xl bg-white/30 p-1 text-pink-500 group-hover:bg-white/60 transition-all" />
          <span>Analytics</span>
        </NavLink>
        <NavLink to="/gestione-post" className={({isActive}) =>
          `flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold text-lg transition-all duration-200 group hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 hover:shadow-lg ${isActive ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-200'}`
        }>
          <Settings size={28} className="rounded-xl bg-white/30 p-1 text-purple-500 group-hover:bg-white/60 transition-all" />
          <span>Settings</span>
        </NavLink>
      </nav>
      <div className="mt-auto px-8 py-6 text-xs text-gray-400 dark:text-gray-600">© 2024 SocialDash</div>
    </aside>
  );
}
