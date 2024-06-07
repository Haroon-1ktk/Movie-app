import React from 'react'
import moment from 'moment'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
const Card = ({movies,heading,media_type}) => {
    const imageUrl=useSelector((state)=>state.moviedata.imageUrl);

//carousel
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
      breakpoint: { max: 1024, min: 444 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 444, min: 444 },
      items: 2
    },
    
  };
   
    
  return (
   <>
    <div className="mx-auto container px-3 my-10">
      <h2 className="text-lg md:text-2xl mb-2 font-bold capitalize">{heading}</h2>
     <div className="">
     <div className="grid grid-cols-[repeate(auto-fit,230px)] grid-flow-col gap-6">
        
     <Carousel responsive={responsive}  swipeable={true}>
     {movies.map((movie, index) => {
      return(
        <>
          <Link to={`/${movie.media_type||media_type}/${movie.id}`} key={index}>
          <div className="relative w-full min-w-[230px] max-w-[230px] h-80 rounded" key={index}>
            <img src={imageUrl + movie.backdrop_path} className="h-full" />
            <div className="absolute bottom-0 p-2 backdrop:blur-3xl bg-black/60 w-full">
              <h1 className="text-ellipsis line-clamp-1 text-lg font-semibold">
                {movie.original_title || movie.name}
              </h1>
              <div className="flex justify-between items-center">
                <p>{moment(movie.release_date).format("MMM Do YYYY")}</p>
                <p className="bg-black rounded-full text-xs px-1">
                  Ratings: {Number(movie.vote_average).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </Link>
        </>
       )})}
    </Carousel>
     </div>
   </div>
      </div>
   </>
  )
}

export default Card