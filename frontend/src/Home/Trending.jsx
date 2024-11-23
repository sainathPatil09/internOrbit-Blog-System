import React from 'react'
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Trending = () => {
    const { blogs } = useAuth()

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <>
        <div className=' w-[88%] justify-between items-center mx-auto p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Trending</h1>
      <Carousel responsive={responsive}>
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 6).map((element) => {
            { console.log(element) }
            return (
              <div key={element._id} className='p-3 bg-white border border-gray-400 rounded-lg shadow-md mx-2'>
                <Link to={`/blog/${element._id}`}
                  className='bg-white hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'
                >

                  <div className="rounded-xl overflow-hidden   w-84 shadow-xl h-52">
                    <div className='group relative h-full'>
                      <img
                        className='w-full h-full object-cover'
                        src={element?.blogImage.url}
                        alt="Shoes" />
                      <h1 className='absolute text-white font-semibold bottom-1 left-3 text-md group-hover:text-black transition-colors duration-300'>{element?.title} </h1>
                      <h2 className='absolute text-white font-semibold bottom-6 left-3 text-xl group-hover:text-black transition-colors duration-300'>{element?.category}</h2>
                    </div>

                  </div>


                  {/* <div className="rounded-xl overflow-hidden  w-84 shadow-xl">
                    <figure className=' group relative h-full'>
                      <img
                        src={element.blogImage.url}
                        alt="Shoes" />
                      <h1 className='absolute text-black font-semibold bottom-1 left-3 text-md group-hover:text-yellow-400 transition-colors duration-300'>{element.title} </h1>
                    </figure>
                    <div className="flex p-6 flex-row gap-8">
                      <img className='w-16 h-16 rounded-full  border-2 border-yellow-300' src={element.adminPhoto} alt="photo" />
                      <div className=''>

                        <p className='text-black text-lg'  >{element.adminName}</p>
                        <p>2</p>
                      </div>

                    </div>
                  </div> */}
                </Link>
              </div>)
          })
        ) : (<div className=" flex items-center justify-center">
          Loading....
        </div>)}
      </Carousel>
    </div>
    </>
  )
}

export default Trending
