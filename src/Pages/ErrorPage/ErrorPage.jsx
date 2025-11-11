import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white text-center px-4">
            <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-9xl font-extrabold text-red-500"
            >
                404
            </motion.h1>

            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-semibold mt-4"
            >
                Oops! Page Not Found
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400 mt-3 mb-6 max-w-md"
            >
                The page you're looking for might have been removed or temporarily unavailable.
            </motion.p>

            <Link
                to="/"
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition duration-300 shadow-lg hover:shadow-red-500/40"
            >
                🔙 Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;
