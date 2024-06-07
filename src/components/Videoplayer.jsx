import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';

const Videoplayer = ({ videoId, close, id, media }) => {
    const [videoKey, setVideoKey] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/${media}/${id}/videos`);
                const videoKey = response.data?.results[0]?.key;
                setVideoKey(videoKey);
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchData();
    }, [media, id]);

  

    return (
        <section className='bottom-72 md:bottom-0  right-0 left-0 bg-neutral-700 z-50 fixed flex justify-center items-center'>
            <div className='bg-black  flex flex-col justify-center items-center w-full max-h-[80vh] max-w-screen-lg aspect-video rounded overflow-hidden relative'>
                <button onClick={close} className=' text-3xl -right-1 -top-6 '>
                    <IoClose />
                </button>
                <iframe src={`https:www.youtube.com/embed/${videoKey}`} className='w-full h-full' />
               {/* <div id='player' className='w-full h-full'></div>**/} 
            </div>
        </section>
    );
};

export default Videoplayer;
