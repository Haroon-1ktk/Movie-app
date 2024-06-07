import { IoHomeOutline } from "react-icons/io5";
import { PiTelevisionFill } from "react-icons/pi";
import { MdMovieFilter } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5"
const Mobilenav = () => {
  return (
    <div className="w-full h-14 z-40 text-neutral-500 bg-black bg-opacity-70 md:hidden fixed bottom-0">
        <div className="flex h-full items-center justify-between">
            <NavLink to={'/'} className={'px-3 items-center flex flex-col h-full justify-center'} >
                <div className="text-2xl"><IoHomeOutline/></div>
                <p className="text-sm">Home</p>
            </NavLink>
            <NavLink to={'tv'} className={'px-3 items-center flex flex-col h-full justify-center'} >
                <div className="text-2xl"><PiTelevisionFill/></div>
                <p className="text-sm">Tv Shows</p>
            </NavLink>
            <NavLink to={'movies'} className={'px-3 items-center flex flex-col h-full justify-center'} >
                <div className="text-2xl"><MdMovieFilter/></div>
                <p className="text-sm">Movies</p>
            </NavLink>
            <NavLink to={'/search'} className={'px-3 items-center flex flex-col h-full justify-center'} >
                <div className="text-2xl"><IoSearchOutline/></div>
                <p className="text-sm">Search</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Mobilenav