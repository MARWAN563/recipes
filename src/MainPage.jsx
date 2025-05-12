import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
 // Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';






const HomePage = () => {
    const sliderData = [
      { 
        url: 'https://www.allRecipes.com/thmb/lhLxw6rwEMT1crUHXmm5edrwjA8=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/245775-spaghetti-alla-carbonara-the-traditional-italian-recipe-DDMFS-4x3-879c32ee3cfb463582e3e6230e311029.jpg', 
        title: 'Spaghetti Carbonara',
        prepTime: '20 mins',
        rating: 4.8
      },
      { 
        url: 'https://www.allRecipes.com/thmb/ZM2uQhT4v_eHhZJ8_S3ieQK1jAM=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/239867chef-johns-chicken-tikka-masala-ddmfs-3X4-0572-e02a25f8c7b745459a9106e9eb13de10.jpg', 
        title: 'Chicken Tikka Masala',
        prepTime: '45 mins',
        rating: 4.9
      },
      { 
        url: 'https://www.allRecipes.com/thmb/BOWPSuN14JbkP3OlizauiSynnHE=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/967492-14686301278b498aaf0f53199e1c48ee.jpg', 
        title: 'Chocolate Lava Cake',
        prepTime: '30 mins',
        rating: 4.7
      },
      { 
        url: 'https://www.allRecipes.com/thmb/m0vR5Q7WSGF8Stzq-uSuwz9YEo8=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2430433-heathers-grilled-salmon-Rock_lobster-1x1-1-c31ec9a9161f49cca8f6d860287b5ed0.jpg', 
        title: 'Grilled Salmon',
        prepTime: '25 mins',
        rating: 4.6
      },
      { 
        url: 'https://www.allRecipes.com/thmb/09DT9XlA-34mCcVRNk_MYA4gT-g=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Classic-Caesar-Salad-2000-6b3bd6e156f84d1ab5e776702bd48a15.jpg', 
        title: 'Caesar Salad',
        prepTime: '15 mins',
        rating: 4.5
      },
      { 
        url: 'https://www.allRecipes.com/thmb/P808O5EJ1y7vbnF_nZnmgonKDDI=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/16311-simple-beef-stroganoff-DDMFS-4x3-1e966286eef54c0f96c882e569926eb3.jpg', 
        title: 'Beef Stroganoff',
        prepTime: '40 mins',
        rating: 4.7
      }
    ];
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <header className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/30">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
              alt="Delicious Food"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Discover Amazing Recipes</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Find the perfect recipe for every occasion, skill level, and dietary need
            </p>
            <div className="mt-8">
            <Link to="/Recipes" className="bg-white text-red-500 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-red-500 hover:text-white transition duration-300">
              Explore Recipes
            
            </Link>
      
            </div>
          </div>
        </header>
  
        {/* Featured Recipes Slider */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Recipes</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our most popular and highly rated dishes
              </p>
            </div>
  
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
                type: 'bullets',
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              spaceBetween={40}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
              className="relative"
            >
              {sliderData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative pb-[75%] overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {item.prepTime}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
  
              {/* Navigation buttons */}
              <div className="swiper-button-prev !text-red-500 !w-12 !h-12 !rounded-full !bg-white !shadow-lg after:!text-xl"></div>
              <div className="swiper-button-next !text-red-500 !w-12 !h-12 !rounded-full !bg-white !shadow-lg after:!text-xl"></div>
              
              {/* Pagination */}
              <div className="swiper-pagination !relative !mt-10"></div>
            </Swiper>
          </div>
        </section>
  
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-orange-400 to-red-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Cooking?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of food lovers and get access to thousands of Recipes
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
             
           
            </div>
          </div>
        </section>
      </div>
    );
  };
  
export default HomePage;