import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import axios from "axios";
import { useSelector } from "react-redux";
import moment from 'moment';
const Explore = () => {
 const params=useParams();
 const [discovered,setDiscovered]=useState([]);
 const [pageno,setPageno]=useState(1);
 const [totalpageno,setTotalPages]=useState(1);
 const imageUrl=useSelector((state)=>state.moviedata.imageUrl);

 
 //to check if media type exists
 //const media_type= response.data.results.media_type? media_type; 
useEffect(()=>{
  const fetchdiscover=async()=>{
    try {
      const response=await axios.get(`/discover/${params.explore}`,{
        params:{
          page:pageno
        }
      });
      console.log(response.data)
      setDiscovered((prev)=>{
        return[
          ...prev,
          ...response.data.results
        ]
      });
      setTotalPages(response.data.total_pages);
      console.log(response);
    } catch (error) {
      console.log('err',error)
    }
   }
  
   //the function is callled here
 
  fetchdiscover()
},[pageno,params.explore])
useEffect(()=>{
  const fetchdiscover=async()=>{
    try {
      const response=await axios.get(`/discover/${params.explore}`,{
        params:{
          page:pageno
        }
      });
      console.log(response.data)
      setDiscovered((prev)=>{
        return[
          ...prev,
          ...response.data.results
        ]
      });
      setTotalPages(response.data.total_pages);
      console.log(response);
    } catch (error) {
      console.log('err',error)
    }
   }
  
  setPageno(1)
  fetchdiscover();
},[pageno,params.explore])
//scroll
const HandleScroll=()=>{
  if((window.innerHeight + window.scrollY)>=document.body.offsetheight){
    setPageno(prev => prev+1)
  }
}
useEffect(()=>{
  window.addEventListener('scroll',HandleScroll)
},[])
  return (
    <div className="my-16">
      <div className="container mx-auto">
      <h3 className="capitalize lg:text-xl font-semibold my-2">Popular {params.explore}Shows</h3>
      <div className=" grid grid-cols-[repeat(auto-fit,230px)] gap-6">
     {discovered.map((movie,index)=>{
      return(
        <>
         <Link to={`/${movie.media_type ||params.explore }/${movie.id}`} key={index}>
          <div className="relative w-full min-w-[230px] max-w-[230px] h-80 rounded hover:scale-105 transition-all">
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
      </div>
      </div>
    </div>
  )
}

export default Explore