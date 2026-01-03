import React, { useContext, useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaCamera, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import userImg from '../../assets/user.png';
import { AuthContext } from '../../Context/AuthContext';

const ProfilePage = () => {
    const { user, updateUser, setUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        phone: '',
        address: '',
        bio: '',
        dateOfBirth: '',
    });

    // Initialize form with user data
    useEffect(() => {
        if (user) {
            setFormData({
                displayName: user.displayName || '',
                email: user.email || '',
                phone: user.phoneNumber || '',
                address: '',
                bio: '',
                dateOfBirth: '',
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = async () => {
        if (!formData.displayName.trim()) {
            toast.error('Display name is required');
            return;
        }

        setLoading(true);
        try {
            await updateUser({
                displayName: formData.displayName,
                // Firebase only allows updating displayName and photoURL
                // phoneNumber requires additional verification
            });

            // Update local user state
            setUser({
                ...user,
                displayName: formData.displayName,
            });

            setIsEditing(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB
            toast.error('Image size should be less than 5MB');
            return;
        }

        setImageUploading(true);

        // In a real app, you would upload to Firebase Storage or your backend
        // For now, we'll create a local URL
        try {
            const imageUrl = URL.createObjectURL(file);

            // Update user profile with new photo
            await updateUser({
                photoURL: imageUrl
            });

            // Update local user state
            setUser({
                ...user,
                photoURL: imageUrl
            });

            toast.success('Profile picture updated!');
        } catch (error) {
            console.error('Error updating image:', error);
            toast.error('Failed to update profile picture');
        } finally {
            setImageUploading(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset form to original user data
        setFormData({
            displayName: user.displayName || '',
            email: user.email || '',
            phone: user.phoneNumber || '',
            address: '',
            bio: '',
            dateOfBirth: '',
        });
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please log in to view profile</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 py-8">
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">My Profile</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Manage your personal information and preferences
                    </p>
                </div>

                {/* Profile Container */}
                <div className="max-w-6xl mx-auto">
                    <div className="bg-base-200 dark:bg-base-300 rounded-2xl shadow-xl overflow-hidden">
                        {/* Profile Header */}
                        <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                {/* Profile Image */}
                                <div className="relative">
                                    <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden bg-white">
                                        <img
                                            src={user.photoURL || userImg}
                                            alt={user.displayName || 'User'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Image Upload Button */}
                                    <label className="absolute bottom-2 right-2 bg-white text-primary p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                        <FaCamera />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            disabled={imageUploading}
                                        />
                                    </label>

                                    {imageUploading && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                                            <span className="loading loading-spinner loading-sm text-white"></span>
                                        </div>
                                    )}
                                </div>

                                {/* User Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-3xl font-bold mb-2">
                                        {user.displayName || 'User'}
                                    </h2>
                                    <p className="text-white/90 mb-4">{user.email}</p>

                                    <div className="flex flex-wrap gap-3">
                                        <span className="badge badge-lg bg-white/20">
                                            Member since {new Date(user.metadata.creationTime).getFullYear()}
                                        </span>
                                        <span className="badge badge-lg bg-white/20">
                                            {user.emailVerified ? 'Verified' : 'Unverified'}
                                        </span>
                                    </div>
                                </div>

                                {/* Edit Button */}
                                <div>
                                    {isEditing ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSaveProfile}
                                                disabled={loading}
                                                className="btn btn-success btn-lg gap-2"
                                            >
                                                {loading ? (
                                                    <span className="loading loading-spinner loading-sm"></span>
                                                ) : (
                                                    <FaSave />
                                                )}
                                                Save Changes
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="btn btn-error btn-lg gap-2"
                                            >
                                                <FaTimes />
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="btn btn-white btn-lg gap-2"
                                        >
                                            <FaEdit />
                                            Edit Profile
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Profile Content */}
                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Personal Information */}
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold flex items-center gap-3">
                                        <FaUser />
                                        Personal Information
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                Full Name
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="displayName"
                                                    value={formData.displayName}
                                                    onChange={handleInputChange}
                                                    className="input input-bordered w-full"
                                                    placeholder="Enter your full name"
                                                />
                                            ) : (
                                                <div className="text-lg">{user.displayName || 'Not set'}</div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                                                <FaEnvelope />
                                                Email Address
                                            </label>
                                            <div className="text-lg">{user.email}</div>
                                            <small className="text-gray-500">Email cannot be changed</small>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                                                <FaPhone />
                                                Phone Number
                                            </label>
                                            <div className="text-lg">{user.phoneNumber || 'Not set'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold flex items-center gap-3">
                                        <FaUserCircle />
                                        Additional Information
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                                                <FaMapMarkerAlt />
                                                Address
                                            </label>
                                            <div className="text-lg">{formData.address || 'Not set'}</div>

                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                                                <FaCalendarAlt />
                                                Date of Birth
                                            </label>
                                            <div className="text-lg">{formData.dateOfBirth || 'Not set'}</div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                Bio
                                            </label>
                                            <div className="text-lg">{formData.bio || 'No bio added yet'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;