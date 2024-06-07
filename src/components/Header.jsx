import {NavLink,Link, useNavigate, useLocation} from "react-router-dom"
import { IoSearchOutline } from "react-icons/io5"
import {useState} from "react"

const Header = () => {
  const navigate=useNavigate();
  const location=useLocation();
  const removespace=location?.search?.slice(3)?.split("%20")?.join(" ")
  const [searchInput,setSearchInput]=useState(removespace);

  const handleClick=(e)=>{
    e.preventDefault();
    if(searchInput){
      navigate(`search?q=${searchInput}`);
      setSearchInput("")
    }
  }
  return (
   <>
   <header className="h-16 bg-black opacity-75 fixed top-0 w-full z-40">
   <div className="flex items-center h-full container mx-auto px-2">
    <div>
      <Link to={'/'}><h4 className="text-[#FF0000] text-lg font-bold">MovieFlix</h4></Link>
    </div>
    <div className="hidden md:flex items-center ml-5">
    <div className="">
      <NavLink to={'tv'} className={'px-2 text-neutral-300 active:text-neutral-100 '}>
      Tv Shows
      </NavLink>
    </div>
   </div>
   <div className="ml-auto flex items-center gap-4">
    <form className="flex items-center" onSubmit={handleClick}>
      <input type="text" placeholder="search here..." 
      className="hidden md:block outline-none border-none bg-transparent"
      onChange={(e)=>setSearchInput(e.target.value)}
      value={searchInput}/>
      <button className="text-2xl text-white">
      <IoSearchOutline/>
      </button>
    </form>
   </div>
   </div>
   </header>
   </>
  )
}

export default Header