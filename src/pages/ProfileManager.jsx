import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../features/posts/postsSlice';
import Input from '../components/Input';
import Button from '../components/Button';
import { ArrowLeft, Image, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function GestionePost(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.posts);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const imageUrl = watch('image');

  const onSubmit = (data) => {
    const postData = {
      ...data,
      authorId: user.id,
      authorName: user.username,
    };
    
    dispatch(createPost(postData))
      .unwrap()
      .then(() => {
        toast.success('Post creato con successo! 🎉');
        navigate('/feed');
      })
      .catch((error) => {
        toast.error('Errore nella creazione del post. Riprova.');
      });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Devi essere loggato per creare un post</p>
          <Link to="/">
            <Button variant="primary">Vai al Login</Button>
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
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Crea Nuovo Post</h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Titolo"
              name="title"
              placeholder="Inserisci il titolo del post"
              error={errors.title?.message}
              required
              {...register('title', {
                required: 'Il titolo è richiesto',
                minLength: {
                  value: 3,
                  message: 'Il titolo deve essere di almeno 3 caratteri',
                },
                maxLength: {
                  value: 100,
                  message: 'Il titolo non può superare i 100 caratteri',
                },
              })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contenuto <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('content', {
                  required: 'Il contenuto è richiesto',
                  minLength: {
                    value: 10,
                    message: 'Il contenuto deve essere di almeno 10 caratteri',
                  },
                })}
                rows={6}
                className={`
                  w-full px-3 py-2 border rounded-lg shadow-sm
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  dark:focus:ring-blue-400 dark:focus:border-blue-400
                  ${errors.content ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
                `}
                placeholder="Scrivi il contenuto del tuo post..."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content.message}</p>
              )}
            </div>

            <Input
              label="URL Immagine (opzionale)"
              name="image"
              placeholder="https://example.com/image.jpg"
              error={errors.image?.message}
              {...register('image', {
                pattern: {
                  value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                  message: 'Inserisci un URL valido per l\'immagine',
                },
              })}
            />

            {/* Preview immagine */}
            {imageUrl && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Anteprima immagine:</h4>
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link to="/feed">
                <Button variant="outline" type="button">
                  Annulla
                </Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creazione...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Pubblica Post
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default GestionePost; 