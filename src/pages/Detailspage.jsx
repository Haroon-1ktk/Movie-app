import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import Card from "../components/Card";
import Videoplayer from "../components/Videoplayer";
import Loading from '../components/Loading'
import Error from "../components/Error";
const Detailspage = () => {
  const [details,setDeatils]=useState({});
  const [moviecast,setMoviecast]=useState({cast:[],crew:[]});
  const [simil,setSimil]=useState([]);
  const [recom,setRecom]=useState([]);
  const [playvideo,setPlayvideo]=useState(false);
  const [playvideoId,setPlayvideoId]=useState("");
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)
  const params=useParams();
 const imageUrl=useSelector(state=>state.moviedata.imageUrl)
  useEffect(()=>{
    //singlemovie details and movie cast function is called with in movieinfo function
   const fetchshowinfo=()=>{
    const fetchmoviedetails=async()=>{
      try {
        setLoading(true)
       const response=await axios.get(`/${params.explore}/${params.id}`)
       setDeatils(response.data);
       setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(true)
       console.log('error',error)
      }
     };
     //moviecast
     const fetchmoviecast=async()=>{
      try {
        setLoading(true)
       const response=await axios.get(`/${params.explore}/${params.id}/credits`)
      setMoviecast(response.data)
      setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(true)
       console.log('error',error)
      }
     }
     //similar series or movies
     const fetchSimilar=async()=>{
      try {
        setLoading(true)
        const response=await axios.get(`/${params.explore}/${params.id}/similar`)
     setSimil(response.data.results)
     setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(true)
        console.log("error",error)
      }
     }
     //recommended movies or series
     const fetchRecom=async()=>{
      try {
        setLoading(true)
        const response=await axios.get(`/${params.explore}/${params.id}/recommendations`)
     setRecom(response.data.results)
     setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(true)
        console.log("error",error)
      }
     }
     fetchmoviedetails();
     fetchmoviecast();
     fetchSimilar();
     fetchRecom();
   }
   fetchshowinfo();
  },[params.explore,params.id])
  const duration=Number(details.runtime/60).toFixed(1).split(".");
  const writer=moviecast.crew?.filter(el=>el.job==='Writer')?.map(el=>el.name).join(",");
  //videoplayer
  const Handleplayvideo=(details)=>{
  setPlayvideoId(details.id);
  setPlayvideo(true);
  console.log("clicked")
  }
  if(loading)return <> <Loading/></>;
  if(error)return <><Error/></>
  return (
  <>
    <div className="">
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
        <img src={imageUrl+details?.backdrop_path} className="w-full h-full object-cover"/>
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-800 to-transparent"></div>
      </div>
      <div className="container mx-auto px-3 md:py-0 py-16 flex flex-col md:flex-row gap-5 md:gap-10">
        <div className="relative mx-auto md:mx-0 md:-mt-28 w-fit min-w-60">
        <img src={imageUrl+details?.poster_path||imageUrl+details?.backdrop_path} 
        className="h-80 w-full object-cover rounded"/>
        <button className="mt-2 py-2 px-4 w-full text-black bg-white text-center rounded font-bold text-lg hover:bg-gradient-to-r from-red-500 to-orange-500
        hover:scale-105"
        onClick={()=>Handleplayvideo(details)}
        >Play Now</button>
        </div>
        <div>
          <h2 className="font-bold text-2xl lg:text-4xl">{details.title||details.name}</h2>
          <p className="text-neutral-400">{details?.tagline}</p>
          <div className="flex items-center gap-3">
            <p>Ratings: {Number(details.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>Total Views: {Number(details.vote_count)}</p>
            <span>|</span>
            <p>Duration: {duration[0]}h {duration[1]}m</p>
          </div>
          <Divider/>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p className="text-neutral-400">{details?.overview}</p>
            <Divider/>
            <div className="flex items-center gap-3 my-3">
              <p>Status: {details?.status}</p>
              <span>|</span>
              <p>Released: {moment(details?.release_date).format("MMMM Do YYYY")}</p>
            </div>
            <Divider/>
          </div>
          <div>
            <p><span className="text-white">Director:</span>{moviecast.crew[0]?.name}</p>
            <p>writer:{writer}</p>
            <Divider/>
             {/**Cast */}
             <h2 className="text-xl md:text-2xl text-white">Cast:</h2>
             <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-3">
              {moviecast.cast.filter(el=>el.profile_path).map((cast,index)=>{
                return(
                  <>
                  <div key={index}>
                    <div>
                      <img src={imageUrl+cast?.profile_path} 
                      alt={cast?.original_name||cast?.name} 
                      className="w-24 h-24 bg-cover rounded-full"/>
                    </div>
                   <p className="text-bold text-center text-sm">{cast?.original_name||cast?.name}</p>
                  </div>
                  </>
                )
              })}
             </div>
          </div>
        </div>
      </div>
      <Card movies={simil} heading={"Similar "+params.explore} media_type={params.explore}/>
      <Card movies={recom} heading={"Recommended "+params.explore} media_type={params.explore}/>
      {playvideo &&
      <Videoplayer videoId={playvideoId} close={()=>setPlayvideo(false)} media={params.explore} id={params.id}/>
      }
    </div>
  </>
  )
}

export default Detailspage