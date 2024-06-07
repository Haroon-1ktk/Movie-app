import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Similar = ({movieid,exploreid}) => {
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
       
    const imageUrl=useSelector(state=>state.moviedata.imageUrl)
    const [simil,setSimil]=useState([]);
    useEffect(()=>{
        const fetchSimilar=async()=>{
            try {
              const response=await axios.get(`/${exploreid}/${movieid}/similar?api_key=135a36eceaf004b171703e4385207c61`)
           setSimil(response.data.results)
            } catch (error) {
              console.log("error",error)
            }
           }
           fetchSimilar()
    },[movieid,exploreid])
  return (
    <>
    <div className="mx-auto container px-3 my-10">
    <h2 className="text-lg md:text-2xl mb-2 font-bold">{"similar" +exploreid}</h2>
   <div className="">
   <div className="grid grid-cols-[repeate(auto-fit,230px)] grid-flow-col gap-6">
    <Carousel responsive={responsive}>
        {simil.map((movie,index)=>{
            return(
                <>
                 <Link to={`/${movie.media_type||exploreid}/${movie.id}`} key={index}>
          <div className="relative w-full min-w-[230px] max-w-[230px] h-80 rounded">
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
            )
        })}
    </Carousel>
   </div>
   </div>
   </div>
   </>
  )
}

export default Similar