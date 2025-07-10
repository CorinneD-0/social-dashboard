import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../features/auth/authSlice';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Campo obbligatorio';
    if (!form.password) newErrors.password = 'Password obbligatoria';
    else if (form.password.length < 6) newErrors.password = 'Minimo 6 caratteri';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
    setIsLoading(true);
    
    try {
        const result = await dispatch(loginUser({ username: form.email, password: form.password })).unwrap();
        toast.success(`Welcome back, ${result.user?.name || result.name || form.email}! 🎉`);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed! Please check your credentials 😅');
    } finally {
      setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-200 via-yellow-100 to-orange-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 font-genz relative overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 opacity-30 rounded-full blur-3xl z-0 animate-float" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-200 opacity-30 rounded-full blur-3xl z-0 animate-float" />
      <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-orange-200 opacity-20 rounded-full blur-3xl z-0 animate-float" style={{transform:'translate(-50%,-50%)'}} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Login Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 rounded-3xl shadow-2xl p-10 text-center backdrop-blur-xl border border-white/40">
          {/* Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="emoji-large mb-4">🚀</div>
            <h1 className="text-4xl font-display font-extrabold text-gradient-primary mb-2 tracking-tight">Welcome Back!</h1>
            <p className="text-gray-600 dark:text-gray-300 text-base">Let's get you back to your social dashboard ✨</p>
          </motion.div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Username Input */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 text-left">Username o Email 👤</label>
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input-genz w-full px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-genz text-base shadow-md"
                placeholder="Inserisci username o email"
                required
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 text-left">Password 🔒</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="input-genz w-full px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus-genz text-base shadow-md"
                placeholder="Enter your password"
                required
              />
              {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
            </motion.div>

            {/* Login Button */}
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              type="submit"
              disabled={isLoading}
              className="btn-genz !bg-none w-full py-3 text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-lg flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner-genz mr-2"></div>
                  Logging in...
                </div>
              ) : (
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-4 rounded-xl shadow-md hover:opacity-90 transition">
                  Let's Go! 🚀
                </span>
              )}
            </motion.button>
          </motion.form>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 shadow"
          >
            <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Demo Credentials 💡</h3>
            <div className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1">
              <p><strong>Admin:</strong> admin / password123</p>
              <p><strong>User:</strong> user / password123</p>
            </div>
          </motion.div>

          {/* Social Login Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-pink-200 hover:to-yellow-200 dark:hover:from-pink-900/20 dark:hover:to-yellow-900/20 transition-colors shadow"
              >
                <span className="mr-2 text-lg">📱</span>
                Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-colors shadow"
              >
                <span className="mr-2 text-lg">💙</span>
                Twitter
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <span className="text-gradient-primary font-semibold cursor-pointer hover:underline">
              Sign up here ✨
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login; 