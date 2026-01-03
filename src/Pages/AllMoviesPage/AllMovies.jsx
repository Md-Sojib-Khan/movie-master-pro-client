import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import MovieCard from '../../Components/MovieCard';
import { 
  FaSearch, 
  FaFilter, 
  FaSortAmountDown, 
  FaSortAmountUp, 
  FaStar, 
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [genreFilter, setGenreFilter] = useState('all');
    const [yearFilter, setYearFilter] = useState('all');
    const [sortBy, setSortBy] = useState('latest');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 8;
    
    const axiosInstance = useAxios();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/movies');
            
            if (response.data && Array.isArray(response.data)) {
                setMovies(response.data);
                setFilteredMovies(response.data);
            } else {
                setMovies([]);
                setFilteredMovies([]);
            }
        } catch (err) {
            console.error('Error fetching movies:', err);
        } finally {
            setLoading(false);
        }
    };

    // Extract unique genres and years for filters
    const genres = ['all', ...new Set(movies.map(movie => movie.genre).filter(Boolean))];
    const years = ['all', ...new Set(movies.map(movie => movie.releaseYear).filter(Boolean))].sort((a, b) => b - a);

    // Apply filters and sorting
    useEffect(() => {
        let result = [...movies];

        // Apply search filter
        if (searchTerm) {
            result = result.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                movie.director?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply genre filter
        if (genreFilter !== 'all') {
            result = result.filter(movie => movie.genre === genreFilter);
        }

        // Apply year filter
        if (yearFilter !== 'all') {
            result = result.filter(movie => movie.releaseYear == yearFilter);
        }

        // Apply sorting
        switch (sortBy) {
            case 'rating-high':
                result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'rating-low':
                result.sort((a, b) => (a.rating || 0) - (b.rating || 0));
                break;
            case 'latest-year':
                result.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
                break;
            case 'oldest-year':
                result.sort((a, b) => (a.releaseYear || 0) - (b.releaseYear || 0));
                break;
            case 'title-asc':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default: // 'latest'
                result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        setFilteredMovies(result);
        setCurrentPage(1);
    }, [movies, searchTerm, genreFilter, yearFilter, sortBy]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setGenreFilter('all');
        setYearFilter('all');
        setSortBy('latest');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
                <p className="text-lg">Loading movies...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 py-8">
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">Explore All Movies</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Discover our collection of {movies.length} amazing movies
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-base-200 dark:bg-base-300 rounded-2xl p-6 mb-8 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {/* Search Input */}
                        <div className="lg:col-span-2">
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search movies by title or director..."
                                    className="input input-bordered w-full pl-12 h-14 text-lg rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Genre Filter */}
                        <div>
                            <div className="relative">
                                <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <select
                                    value={genreFilter}
                                    onChange={(e) => setGenreFilter(e.target.value)}
                                    className="select select-bordered w-full pl-12 h-14 text-lg rounded-xl appearance-none"
                                >
                                    <option value="all">All Genres</option>
                                    {genres.filter(g => g !== 'all').map((genre, index) => (
                                        <option key={index} value={genre}>{genre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Year Filter */}
                        <div>
                            <div className="relative">
                                <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <select
                                    value={yearFilter}
                                    onChange={(e) => setYearFilter(e.target.value)}
                                    className="select select-bordered w-full pl-12 h-14 text-lg rounded-xl"
                                >
                                    <option value="all">All Years</option>
                                    {years.filter(y => y !== 'all').map((year, index) => (
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sorting and Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-base-300">
                        <div className="flex items-center gap-3">
                            <span className="font-medium">Sort by:</span>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSortBy('latest')}
                                    className={`btn btn-sm ${sortBy === 'latest' ? 'btn-primary' : 'btn-outline'}`}
                                >
                                    Latest Added
                                </button>
                                <button
                                    onClick={() => setSortBy('rating-high')}
                                    className={`btn btn-sm ${sortBy === 'rating-high' ? 'btn-primary' : 'btn-outline'}`}
                                >
                                    <FaStar className="mr-2" />
                                    Highest Rated
                                </button>
                                <button
                                    onClick={() => setSortBy('title-asc')}
                                    className={`btn btn-sm ${sortBy === 'title-asc' ? 'btn-primary' : 'btn-outline'}`}
                                >
                                    Title A-Z
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleClearFilters}
                                className="btn btn-outline btn-sm"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {searchTerm && (
                            <span className="badge badge-primary badge-lg gap-2">
                                Search: {searchTerm}
                                <button onClick={() => setSearchTerm('')} className="btn btn-xs btn-circle">
                                    ×
                                </button>
                            </span>
                        )}
                        {genreFilter !== 'all' && (
                            <span className="badge badge-secondary badge-lg gap-2">
                                Genre: {genreFilter}
                                <button onClick={() => setGenreFilter('all')} className="btn btn-xs btn-circle">
                                    ×
                                </button>
                            </span>
                        )}
                        {yearFilter !== 'all' && (
                            <span className="badge badge-accent badge-lg gap-2">
                                Year: {yearFilter}
                                <button onClick={() => setYearFilter('all')} className="btn btn-xs btn-circle">
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                </div>

                {/* Results Info */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                        Showing {currentMovies.length} of {filteredMovies.length} movies
                        {filteredMovies.length !== movies.length && ` (filtered from ${movies.length} total)`}
                    </p>
                    <div className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </div>
                </div>

                {/* Movies Grid */}
                {currentMovies.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                            {currentMovies.map(movie => (
                                <MovieCard movie={movie} key={movie._id} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="btn btn-outline btn-sm rounded-lg gap-2"
                                >
                                    <FaChevronLeft />
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1;
                                    // Show limited page numbers with ellipsis
                                    if (
                                        pageNumber === 1 ||
                                        pageNumber === totalPages ||
                                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => handlePageChange(pageNumber)}
                                                className={`btn btn-sm w-12 rounded-lg ${
                                                    currentPage === pageNumber
                                                        ? 'btn-primary'
                                                        : 'btn-outline'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    } else if (
                                        pageNumber === currentPage - 2 ||
                                        pageNumber === currentPage + 2
                                    ) {
                                        return <span key={pageNumber} className="px-2">...</span>;
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="btn btn-outline btn-sm rounded-lg gap-2"
                                >
                                    Next
                                    <FaChevronRight />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-block p-6 bg-base-200 rounded-2xl mb-6">
                            <div className="text-6xl mb-4">🎬</div>
                            <h3 className="text-2xl font-bold mb-2">No Movies Found</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
                                {searchTerm || genreFilter !== 'all' || yearFilter !== 'all'
                                    ? 'Try adjusting your filters or search term'
                                    : 'No movies available in the collection'}
                            </p>
                            <button
                                onClick={handleClearFilters}
                                className="btn btn-primary"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllMovies;