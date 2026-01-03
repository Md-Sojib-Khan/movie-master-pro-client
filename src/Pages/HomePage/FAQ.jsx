import React, { useState } from 'react';
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaEnvelope } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [emailCopied, setEmailCopied] = useState(false);

    const faqs = [
        {
            question: "How do I add a movie to my collection?",
            answer: "You can add movies by clicking the 'Add Movie' button in your dashboard. Fill in the movie details like title, genre, rating, and upload a poster image. Once submitted, it will appear in your personal collection."
        },
        {
            question: "Is MovieMaster Pro completely free?",
            answer: "Yes! MovieMaster Pro is completely free to use. You can add unlimited movies, create wishlists, and manage your collection without any charges. We believe in providing the best movie management experience for free."
        },
        {
            question: "Can I update or delete movies from my collection?",
            answer: "Absolutely. You can edit any movie you've added by clicking the edit button on the movie card. To delete a movie, go to your collection, find the movie, and click the delete button. Only you can modify movies you've added."
        },
        {
            question: "How does the wishlist feature work?",
            answer: "The wishlist allows you to save movies you want to watch later. You can add movies to your wishlist from the movie details page. Your wishlist is private and only visible to you in your dashboard."
        },
        {
            question: "What information do I need to add a movie?",
            answer: "To add a movie, you need at least the movie title. Other optional details include genre, rating, duration, release year, director, cast, plot summary, and poster image. The more details you provide, the better your collection will be organized."
        },
        {
            question: "How can I search for specific movies?",
            answer: "Use the search bar on the home page or explore page. You can search by movie title or director. The search feature works in real-time and shows suggestions as you type."
        },
        {
            question: "Can I filter movies by genre?",
            answer: "Yes! On the 'All Movies' page, you can filter movies by genre, year, and rating. You can also sort movies by latest added, highest rated, or alphabetically."
        },
        {
            question: "Is my movie collection private?",
            answer: "Movies you add are public and visible to all users on the platform. However, your wishlist and dashboard analytics are private and only accessible to you when logged in."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleEmailClick = () => {
        const email = '007shojibkhan@gmail.com';
        
        // Method 1: Direct mailto link (opens email client)
        window.location.href = `mailto:${email}?subject=MovieMaster Pro Support`;
        
        // Method 2: Copy to clipboard as fallback
        navigator.clipboard.writeText(email)
            .then(() => {
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 3000);
            })
            .catch(err => {
                console.error('Failed to copy email: ', err);
                // Fallback: Just open mailto
                window.location.href = `mailto:${email}`;
            });
    };

    const handleBrowseClick = () => {
        window.location.href = '/all-movies';
    };

    return (
        <section className="py-16 bg-base-200" id="faq">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                        <FaQuestionCircle className="text-3xl text-primary" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Find quick answers to common questions about using MovieMaster Pro
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="mb-4 bg-base-100 rounded-xl shadow-sm overflow-hidden border border-base-300 transition-all duration-300 hover:shadow-md"
                        >
                            {/* Question Header */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-base-200 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-sm font-bold">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                            {faq.question}
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 ml-4">
                                    {openIndex === index ? (
                                        <FaChevronUp className="text-gray-500 text-lg" />
                                    ) : (
                                        <FaChevronDown className="text-gray-500 text-lg" />
                                    )}
                                </div>
                            </button>

                            {/* Answer Content */}
                            {openIndex === index && (
                                <div className="px-6 pb-6 pt-4 border-t border-base-300 animate-fadeIn">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-2 h-full bg-primary rounded-full"></div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Additional Help Section */}
                <div className="text-center mt-12">
                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 max-w-2xl mx-auto border border-primary/20 shadow-lg">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                            <FaEnvelope className="text-3xl text-primary" />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
                            Our support team is ready to assist you. Click below to send us an email directly.
                        </p>

                        {/* Email Display with Copy Option */}
                        <div className="mb-6">
                            <div className="inline-flex items-center gap-3 bg-base-100 px-6 py-3 rounded-lg border border-base-300">
                                <span className="text-gray-600">Email us at:</span>
                                <span className="font-mono font-bold text-primary">007shojibkhan@gmail.com</span>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText('007shojibkhan@gmail.com');
                                        setEmailCopied(true);
                                        setTimeout(() => setEmailCopied(false), 2000);
                                    }}
                                    className="btn btn-xs btn-ghost"
                                    title="Copy email address"
                                >
                                    {emailCopied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* Contact Support Button - Opens Email Directly */}
                            <button
                                onClick={handleEmailClick}
                                className="btn btn-primary btn-lg gap-2 group"
                            >
                                <FaEnvelope />
                                Contact Support
                                <span className="group-hover:translate-x-1 transition-transform">
                                    →
                                </span>
                            </button>

                            {/* Browse Movies Button */}
                            <button
                                onClick={handleBrowseClick}
                                className="btn btn-outline btn-lg"
                            >
                                Browse Movies
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-6 pt-6 border-t border-base-300">
                            <p className="text-sm text-gray-500">
                                Response time: Usually within 24 hours
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;