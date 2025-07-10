import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByUsername, updateUser } from '../features/users/usersSlice';
import { fetchPosts } from '../features/posts/postsSlice';
import { useForm } from 'react-hook-form';
import PostCard from '../components/PostCard';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import { Edit, User, Mail, Calendar, Users, FileText, ArrowLeft } from 'lucide-react';

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { currentUser, loading: userLoading } = useSelector((state) => state.users);
  const { posts, loading: postsLoading } = useSelector((state) => state.posts);
  const { user: currentAuthUser } = useSelector((state) => state.auth);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bioForm, setBioForm] = useState('');
  const [bioError, setBioError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(fetchUserByUsername(username));
    dispatch(fetchPosts());
  }, [dispatch, username]);

  useEffect(() => {
    if (currentUser) {
      reset({
        bio: currentUser.bio || '',
        email: currentUser.email || '',
      });
      setBioForm(currentUser.bio || '');
    }
  }, [currentUser, reset]);

  const handleEditProfile = (data) => {
    if (currentUser) {
      dispatch(updateUser({ id: currentUser.id, userData: { ...currentUser, ...data } }));
      setIsEditing(false);
      setIsEditModalOpen(false);
    }
  };

  const handleBioChange = e => {
    setBioForm(e.target.value);
    if (e.target.value.length < 10) setBioError('La bio deve avere almeno 10 caratteri');
    else setBioError('');
  };
  const handleBioSubmit = e => {
    e.preventDefault();
    if (bioForm.length < 10) setBioError('La bio deve avere almeno 10 caratteri');
    else {
      setBioError('');
      // ... submit logic ...
    }
  };

  const canEdit = currentAuthUser && (currentAuthUser.role === 'admin' || currentAuthUser.username === username);

  // Filtra i post dell'utente
  const userPosts = posts.filter(post => post.authorName === username);

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento profilo...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Utente non trovato</p>
          <Link to="/feed">
            <Button variant="primary">Torna al Social Feed</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/feed" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Torna al Social Feed
            </Link>
            {canEdit && (
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifica Profilo
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Cover and Avatar */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute -bottom-16 left-8">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>

          {/* Profile Details */}
          <div className="pt-20 pb-6 px-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentUser.username}
                </h1>
                <p className="text-gray-600 mb-4">{currentUser.bio || 'Nessuna bio disponibile'}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {currentUser.email}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {currentUser.followers} followers
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    {userPosts.length} post
                  </div>
                </div>
              </div>
              
              {currentUser.role === 'admin' && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Admin
                </span>
              )}
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Post di {currentUser.username}</h2>
          
          {postsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Caricamento post...</p>
            </div>
          ) : userPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <div className="text-gray-400 mb-4">
                <FileText className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun post ancora</h3>
              <p className="text-gray-600">
                {canEdit ? 'Crea il tuo primo post!' : `${currentUser.username} non ha ancora pubblicato nulla.`}
              </p>
              {canEdit && (
                <Link to="/create" className="mt-4 inline-block">
                  <Button variant="primary">
                    Crea Post
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Modifica Profilo"
        size="lg"
      >
        <form onSubmit={handleSubmit(handleEditProfile)} className="space-y-6">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Inserisci la tua email"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email è richiesta',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email non valida',
              },
            })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              {...register('bio', {
                maxLength: {
                  value: 200,
                  message: 'La bio non può superare i 200 caratteri',
                },
              })}
              rows={4}
              className={`
                w-full px-3 py-2 border rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${errors.bio ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
              `}
              placeholder="Racconta qualcosa di te..."
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Annulla
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isEditing}
            >
              {isEditing ? 'Salvataggio...' : 'Salva Modifiche'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile; 