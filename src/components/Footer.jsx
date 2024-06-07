import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <footer className="text-center text-neutral-400 bg-neutral-600 bg-opacity-35 mt-[4.3rem]">
      <div className="flex justify-center items-center gap-4">
        <Link to={'/about'}>About</Link>
        <Link to={'/contact'}>Contact us</Link>
      </div>
      <p>Created by M Haroon</p>
    </footer>
  )
}

export default Footer