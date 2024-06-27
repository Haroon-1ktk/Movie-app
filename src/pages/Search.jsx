import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from 'moment'
import Loading from "../components/Loading";
import Error from "../components/Error";

const Search = () => {
  const location=useLocation();
  const navigate=useNavigate();
  console.log('location',location.search.slice(3));
  const[searchedresults,setSearchedresults]=useState([]);
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)
  const imageUrl=useSelector((state)=>state.moviedata.imageUrl);
   useEffect(() => {
    const fetchSearch=async()=>{
      try {
        setLoading(true)
        const response=await axios.get(`/search/multi?api_key=135a36eceaf004b171703e4385207c61`,{
          params:{
            query:location?.search?.slice(3),
            page:1
          }
        });
        console.log(response.data)
        setSearchedresults((prev)=>{
          return[
            ...prev,
            ...response.data.results
          ]
        });
        setLoading(false)
        console.log(response);
      } catch (error) {
        setLoading(false)
        BiSolidCommentError(true)
        console.log('err',error)
      }
     }
    fetchSearch()
   },[location.search]);

   if(loading)return<><Loading/></>
   if(error)return<><Error/></>
  return (
  <div className="my-16">
    <div className="my-2 lg:hidden mx-1 sticky top-[70px] z-30">
    <input type="text" 
    onChange={(e)=>navigate(`/search?q=${e.target.value}`)}
    className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"/>
    </div>
      <div className="container mx-auto">
       <h3 className="capitalize lg:text-xl font-semibold my-2">Search Results</h3>
       <div className=" grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center md:justify-start">
        {searchedresults.map((movie,index)=>{
        return(  
        <>
         <Link to={`/${movie.media_type}/${movie.id}`} key={index}>
          <div className="relative w-full min-w-[230px] max-w-[230px] h-80 rounded hover:scale-105 transition-all">
          {  movie.bacdrop_path || movie.poster_path ?(
            <img src={imageUrl + movie.backdrop_path||imageUrl+movie.poster_path} className="h-full" />
          )
          :
          <div className="bg-neutral-800 w-full h-full flex justify-center items-center">no image found</div>
          }
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
       </div>
    </div>
  </div>
  )
}

export default Search
