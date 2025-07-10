export default function TestTailwind() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 dark:from-slate-900 dark:to-purple-900">
      <div className="p-8 rounded-3xl shadow-2xl bg-white dark:bg-slate-800">
        <h1 className="text-4xl font-bold text-pink-600 dark:text-purple-400 mb-4">Tailwind FUNZIONA!</h1>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition">Prova Hover</button>
      </div>
    </div>
  );
} 