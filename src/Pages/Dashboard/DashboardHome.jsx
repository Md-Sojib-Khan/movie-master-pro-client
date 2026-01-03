import React, { useEffect, useState, useContext } from 'react';
import { 
  FaFilm, 
  FaHeart, 
  FaStar, 
  FaPlusCircle, 
  FaEye,
  FaChartBar,
  FaCalendarAlt,
  FaClock,
  FaUserPlus,
  FaFire
} from 'react-icons/fa';
import { Link } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import { AuthContext } from '../../Context/AuthContext';
import Navbar from '../../Components/Navbar';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalMovies: 0,
      myMovies: 0,
      wishlistCount: 0,
      avgRating: 0,
      topRating: 0,
      totalGenres: 0
    },
    recentMovies: [],
    topRatedMovies: [],
    genreDistribution: [],
    activityData: []
  });
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const userEmail = user?.email || localStorage.getItem('userEmail') || '';
      
      // Fetch all data in parallel
      const [allMoviesRes, myMoviesRes, wishlistRes] = await Promise.all([
        axiosInstance.get('/movies'),
        axiosInstance.get(`/movies?email=${encodeURIComponent(userEmail)}`),
        axiosInstance.get(`/wishlist?email=${encodeURIComponent(userEmail)}`)
      ]);

      const allMovies = allMoviesRes.data || [];
      const myMovies = myMoviesRes.data || [];
      const wishlist = wishlistRes.data || [];

      // Calculate statistics
      const totalRating = allMovies.reduce((sum, movie) => sum + (parseFloat(movie.rating) || 0), 0);
      const avgRating = allMovies.length > 0 ? totalRating / allMovies.length : 0;
      const topRating = allMovies.length > 0 ? Math.max(...allMovies.map(m => parseFloat(m.rating) || 0)) : 0;
      
      // Genre distribution calculation
      const genreMap = {};
      allMovies.forEach(movie => {
        if (movie.genre) {
          genreMap[movie.genre] = (genreMap[movie.genre] || 0) + 1;
        }
      });
      
      const genreDistribution = Object.entries(genreMap)
        .map(([genre, count]) => ({
          genre,
          count,
          percentage: Math.round((count / allMovies.length) * 100)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Recent movies (user's movies, sorted by date)
      const recentMovies = [...myMovies]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

      // Top rated movies
      const topRatedMovies = [...allMovies]
        .sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0))
        .slice(0, 5);

      // Activity data (mock for now - you can enhance with real activity)
      const activityData = [
        {
          type: 'movie_added',
          title: 'Added new movie',
          description: `Added "${myMovies[0]?.title || 'a movie'}" to collection`,
          time: '2 hours ago',
          icon: <FaFilm className="text-primary" />
        },
        {
          type: 'wishlist_added',
          title: 'Added to wishlist',
          description: `Added "${wishlist[0]?.movieTitle || 'a movie'}" to wishlist`,
          time: '1 day ago',
          icon: <FaHeart className="text-secondary" />
        },
        {
          type: 'rating_given',
          title: 'Rated movie',
          description: 'Gave 5 stars to a movie',
          time: '3 days ago',
          icon: <FaStar className="text-warning" />
        }
      ];

      setDashboardData({
        stats: {
          totalMovies: allMovies.length,
          myMovies: myMovies.length,
          wishlistCount: wishlist.length,
          avgRating: parseFloat(avgRating.toFixed(1)),
          topRating: parseFloat(topRating.toFixed(1)),
          totalGenres: Object.keys(genreMap).length
        },
        recentMovies,
        topRatedMovies,
        genreDistribution,
        activityData
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
          <p className="text-base-content/70">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const { stats, recentMovies, topRatedMovies, genreDistribution, activityData } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-base-content/70 mt-1">
            Welcome back, {user?.displayName || 'User'}! Here's your movie analytics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm badge badge-outline">
            <FaCalendarAlt className="mr-1" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="card bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-value text-2xl">{stats.totalMovies}</div>
                <div className="stat-title text-sm">Total Movies</div>
              </div>
              <div className="text-primary">
                <FaFilm className="text-2xl" />
              </div>
            </div>
            <div className="stat-desc text-xs mt-2">In database</div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-value text-2xl">{stats.myMovies}</div>
                <div className="stat-title text-sm">My Movies</div>
              </div>
              <div className="text-secondary">
                <FaUserPlus className="text-2xl" />
              </div>
            </div>
            <div className="stat-desc text-xs mt-2">Added by you</div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-value text-2xl">{stats.wishlistCount}</div>
                <div className="stat-title text-sm">Wishlist</div>
              </div>
              <div className="text-accent">
                <FaHeart className="text-2xl" />
              </div>
            </div>
            <div className="stat-desc text-xs mt-2">Saved movies</div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-value text-2xl">{stats.avgRating}</div>
                <div className="stat-title text-sm">Avg Rating</div>
              </div>
              <div className="text-warning">
                <FaStar className="text-2xl" />
              </div>
            </div>
            <div className="stat-desc text-xs mt-2">Overall average</div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-info/10 to-info/5 border border-info/20">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-value text-2xl">{stats.topRating}</div>
                <div className="stat-title text-sm">Top Rating</div>
              </div>
              <div className="text-info">
                <FaFire className="text-2xl" />
              </div>
            </div>
            <div className="stat-desc text-xs mt-2">Highest rating</div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-value text-2xl">{stats.totalGenres}</div>
                <div className="stat-title text-sm">Genres</div>
              </div>
              <div className="text-success">
                <FaChartBar className="text-2xl" />
              </div>
            </div>
            <div className="stat-desc text-xs mt-2">Different genres</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card bg-base-100 shadow-sm border">
            <div className="card-body p-6">
              <h2 className="card-title text-lg mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/dashboard/add-movie"
                  className="btn btn-primary btn-outline gap-2"
                >
                  <FaPlusCircle />
                  Add Movie
                </Link>
                <Link
                  to="/dashboard/my-collection"
                  className="btn btn-secondary btn-outline gap-2"
                >
                  <FaFilm />
                  My Collection
                </Link>
                <Link
                  to="/dashboard/my-wishlist"
                  className="btn btn-accent btn-outline gap-2"
                >
                  <FaHeart />
                  Wishlist
                </Link>
                <Link
                  to="/all-movies"
                  className="btn btn-info btn-outline gap-2"
                >
                  <FaEye />
                  Browse All
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Movies */}
          <div className="card bg-base-100 shadow-sm border">
            <div className="card-body p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title text-lg">My Recent Movies</h2>
                <Link to="/dashboard/my-collection" className="btn btn-ghost btn-xs">
                  View All
                </Link>
              </div>
              
              <div className="space-y-3">
                {recentMovies.length > 0 ? (
                  recentMovies.map((movie) => (
                    <div key={movie._id} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <div className="w-12 h-12 flex-shrink-0">
                        <img
                          src={movie.posterUrl || 'https://via.placeholder.com/150'}
                          alt={movie.title}
                          className="w-full h-full object-cover rounded"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{movie.title}</h4>
                        <div className="flex items-center gap-2 text-sm opacity-70">
                          <span className="badge badge-xs">{movie.genre}</span>
                          <span className="flex items-center gap-1">
                            <FaStar className="text-yellow-500" />
                            {movie.rating || 'N/A'}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/movies/${movie._id}`}
                        className="btn btn-ghost btn-xs"
                      >
                        <FaEye />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-base-content/70">No movies added yet</p>
                    <Link to="/dashboard/add-movie" className="btn btn-primary btn-sm mt-2">
                      Add Your First Movie
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Genre Distribution */}
          <div className="card bg-base-100 shadow-sm border">
            <div className="card-body p-6">
              <h2 className="card-title text-lg mb-4">Genre Distribution</h2>
              <div className="space-y-3">
                {genreDistribution.length > 0 ? (
                  genreDistribution.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.genre}</span>
                        <span>{item.count} movies ({item.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            index === 0 ? 'bg-primary' : 
                            index === 1 ? 'bg-secondary' : 
                            index === 2 ? 'bg-accent' : 
                            index === 3 ? 'bg-warning' : 'bg-info'
                          } rounded-full transition-all duration-500`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-base-content/70">No genre data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Top Rated Movies */}
          <div className="card bg-base-100 shadow-sm border">
            <div className="card-body p-6">
              <h2 className="card-title text-lg mb-4">Top Rated Movies</h2>
              <div className="space-y-3">
                {topRatedMovies.length > 0 ? (
                  topRatedMovies.map((movie, index) => (
                    <div key={movie._id} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="font-bold text-primary">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{movie.title}</h4>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="badge badge-xs">{movie.genre}</span>
                          <span className="flex items-center gap-1 text-yellow-600">
                            <FaStar />
                            {movie.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs opacity-70">
                        {movie.releaseYear || 'N/A'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-base-content/70">No movies found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card bg-base-100 shadow-sm border">
            <div className="card-body p-6">
              <h2 className="card-title text-lg mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {activityData.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-base-200 rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">
                        {activity.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      <p className="text-xs opacity-70">{activity.description}</p>
                    </div>
                    <div className="text-xs opacity-70 flex-shrink-0">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="card bg-base-100 shadow-sm border">
        <div className="card-body p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="card-title text-lg">Movie Database</h2>
            <div className="flex gap-2">
              <Link to="/all-movies" className="btn btn-primary btn-sm">
                View All Movies
              </Link>
              <Link to="/dashboard/add-movie" className="btn btn-outline btn-sm">
                Add New
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Movie Title</th>
                  <th>Genre</th>
                  <th>Rating</th>
                  <th>Duration</th>
                  <th>Release Year</th>
                  <th>Added By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentMovies.map((movie) => (
                  <tr key={movie._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded">
                            <img 
                              src={movie.posterUrl || 'https://via.placeholder.com/150'} 
                              alt={movie.title}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150';
                              }}
                            />
                          </div>
                        </div>
                        <div className="font-medium">{movie.title}</div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-outline">{movie.genre || 'N/A'}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span>{movie.rating || 'N/A'}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <FaClock />
                        <span>{movie.duration || 'N/A'} min</span>
                      </div>
                    </td>
                    <td>{movie.releaseYear || 'N/A'}</td>
                    <td>
                      <div className="text-sm opacity-70 truncate max-w-[150px]">
                        {movie.addedBy || 'Unknown'}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <Link 
                          to={`/movies/${movie._id}`}
                          className="btn btn-ghost btn-xs"
                          title="View Details"
                        >
                          <FaEye />
                        </Link>
                        {movie.addedBy === user?.email && (
                          <Link 
                            to={`/dashboard/movies/update/${movie._id}`}
                            className="btn btn-ghost btn-xs"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;