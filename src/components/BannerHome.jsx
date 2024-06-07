import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight,} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BannerHome = () => {
    const bannerData=useSelector((state)=>state. moviedata.bannerData);
    const imageUrl=useSelector((state)=>state.moviedata.imageUrl);
    const [currentImg,setCurrentImg]=useState(0);

    const handleNext=()=>{
    if(currentImg < bannerData.length -1){
        setCurrentImg(prev => prev + 1)
        console.log('clicked')
    }
    }
    const handlePrevious=()=>{
        if(currentImg > 0){
            setCurrentImg(prev => prev - 1)
            console.log('clicked')
        }
    }
    return (
    <section className="w-full h-full">
        <div className="flex min-h-full max-h-[95vh] overflow-hidden">
            {bannerData.map((movie,index)=>{
                return (
                    <>
                    <div key={index} className="min-w-full relative min-h-[450px] md:min-h-full overflow-hidden transition-all group" style={{transform:`translateX(-${currentImg *100}%)`}}>
                        <div className="w-full h-full">
                        <img src={imageUrl+movie.backdrop_path} alt={movie.original_title}
                        className="h-full w-full object-cover"/>
                    </div>
                    {/**Next and Previous button */}
                    <div className="absolute hidden items-center justify-between top-0 w-full h-full group-hover:md:flex">
                        <button onClick={handlePrevious} className="p-1 z-10 text-xl bg-white rounded-full text-black px-2"><FaAngleLeft/></button>
                        <button onClick={handleNext} className="p-1 z-10 text-xl bg-white rounded-full text-black px-2"><FaAngleRight/></button>
                    </div>
                    <div className="absolute w-full bg-gradient-to-t from-neutral-900 to-transparent h-full top-0"></div>
                  <div className="container mx-auto">
                  <div className="w-full min-w-md pr-3 pl-2 absolute bottom-0">
                        <h1 className="font-bold md:text-4xl text-2xl">{movie.original_title || movie.name}</h1>
                        <p className="text-ellipsis line-clamp-3 my-3">{movie.overview}</p>
                       <div className="flex items-center gap-4">
                        <p>Ratings :{Number(movie.vote_average).toFixed(1)}</p>
                        <span>|</span>
                        <p>Views : {Number(movie.popularity).toFixed(0)}</p>
                       </div>
                      <Link to={'/'+movie.media_type+"/"+movie.id}> <button className="rounded-md px-4 py-2 text-black bg-white  mt-4 font-bold
                       shadow-md transition-all  hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105"
                       >Play now</button></Link>
                    </div>
                  </div>
                    </div>
                    </>
                )
            })}
        </div>
    </section>
  )
}

export default BannerHome