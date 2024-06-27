import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Explore from './pages/Explore';
import Detailspage from './pages/Detailspage'
import Mobilenav from './components/Mobilenav';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setbannerData,setimageUrl } from './store/movieslice';
const App = () => {
  const dispatch=useDispatch();
  const fetchtrending=async()=>{
   try {
    const response=await axios.get(`/trending/all/week?api_key=135a36eceaf004b171703e4385207c61`)
    dispatch( setbannerData(response.data.results))
  
   } catch (error) {
    console.log('error',error)
   }
  }
  const fetchConfiguration=async()=>{
    try {
      const response=await axios.get('/configuration?api_key=135a36eceaf004b171703e4385207c61')
     dispatch(setimageUrl(response.data.images.secure_base_url+"original"))
      console.log(response.data.images.secure_base_url+"original",'config')
    } catch (error) {
      console.log('error',error)
    }
  }
 useEffect(()=>{
  fetchtrending();
  fetchConfiguration();
 },[])

  return (
  <Router>
  <Header/>
  <div className='min-h[90vh]'>
  <Routes>
    <Route path='/'element={<Home/>}/>
    <Route path='/search'element={<Search/>}/>
    <Route path='/:explore'element={<Explore/>}/>
    <Route path='/:explore/:id'element={<Detailspage/>}/>
  </Routes>
  </div>
  <Footer/>
  <Mobilenav/>
  </Router>
  )
}

export default App
