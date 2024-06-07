
import { useSelector } from "react-redux";
import BannerHome from "../components/BannerHome"
import { useEffect, useState } from "react";
import axios from "axios";
import Card from '../components/Card'
const Home = () => {
  const movies=useSelector((state)=>state. moviedata.bannerData);
  const [nowplayingdata,setNowplayingdata]=useState([]);
  const [toprate,setToprate]=useState([]);
  const fethnowplaying=async()=>{
   try {
    const response=await axios.get('/movie/now_playing?api_key=135a36eceaf004b171703e4385207c61')
    setNowplayingdata(response.data.results)
   } catch (error) {
    console.log('error',error)
   }
  }
  const fetchtoprated=async()=>{
    try {
     const response=await axios.get('/movie/top_rated?api_key=135a36eceaf004b171703e4385207c61')
     setToprate(response.data.results)
    } catch (error) {
     console.log('error',error)
    }
   }
  useEffect(()=>{
  fethnowplaying()
  fetchtoprated()
  },[])
  //carousel
 
  return (
    <div className=''>
      <BannerHome/>
    <Card movies={movies} heading="Trending Shows"/>
    <Card movies={nowplayingdata} heading="Now Playing"media_type={"movies"}/>
    <Card movies={toprate} heading="Top Rated" media_type={"movies"}/>
     </div>
  )
}

export default Home;




