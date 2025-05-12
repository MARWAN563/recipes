import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Recipe = ({ recipes }) => {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === id);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
    if (storedComments.length === 0) {
      const randomComments = generateRandomReviews();
      localStorage.setItem(`comments-${id}`, JSON.stringify(randomComments));
      setComments(randomComments);
    } else {
      setComments(storedComments);
    }
  }, [id]);

  const generateRandomReviews = () => {
    const reviews = [
      'Amazing recipe! My family loved it.',
      'Easy to follow and delicious.',
      'Will definitely make this again!',
      'A bit too salty for my taste, but still good.',
      'Perfect for a quick dinner.'
    ];
    return reviews.slice(0, Math.ceil(Math.random() * 3)).map(text => ({
      text,
      rating: Math.ceil(Math.random() * 5)
    }));
  };

  const handleAddComment = () => {
    if (comment.trim() === '') return;
    const newComments = [...comments, { text: comment, rating }];
    setComments(newComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(newComments));
    setComment('');
    setRating(0);
  };

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Recipe not found.</p>
        <Link to="/recipes" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="text-blue-500 hover:underline">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/recipes" className="text-blue-500 hover:underline">Recipes</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-600">{recipe.title}</span>
      </nav>

      {/* Recipe Header */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Recipe Images */}
        <div className="lg:w-1/2">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <SwiperSlide>
              <img 
                src={recipe.main_image} 
                alt={recipe.title}
                className="w-full h-64 md:h-96 object-cover"
                onError={(e) => e.target.src = 'https://via.placeholder.com/800x600?text=Recipe+Image'}
              />
            </SwiperSlide>
            {recipe.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={image} 
                  alt={`${recipe.title} ${index + 1}`}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Recipe Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{recipe.description}</p>
          
          <div className="flex items-center mb-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <span 
                  key={star} 
                  className={`text-2xl ${star <= Math.round(recipe.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">({recipe.rating || 'No'} rating)</span>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Ingredients</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-4 h-4 bg-red-500 rounded-full mt-1 mr-2"></span>
              <span className="text-gray-700">{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Directions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Directions</h2>
        <ol className="space-y-4">
          {recipe.directions.map((step, index) => (
            <li key={index} className="flex">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full mr-3 flex-shrink-0">
                {index + 1}
              </span>
              <p className="text-gray-700">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews</h2>
        
        {/* Add Review */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Add Your Review</h3>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Rating</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl focus:outline-none ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this recipe..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-3"
            rows="4"
          ></textarea>
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Submit Review
          </button>
        </div>

        {/* Reviews List */}
        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span 
                        key={star} 
                        className={`text-lg ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default Recipe;