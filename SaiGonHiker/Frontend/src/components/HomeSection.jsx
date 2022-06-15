import React, { useEffect, useState } from 'react';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import Swiper from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';
function HomeSection(props) {
    const [video, setVideo] = useState("./.mp4/DD.mp4")
    const [activeMark, setActiveMark] = useState(1)
    // let videoBtn = document.querySelectorAll('.vid-btn');
    // useEffect(() => {
    //     videoBtn.forEach(btn =>{
    //     btn.addEventListener('click', () =>{
    //         document.querySelector('.controls .active').classList.remove('active');
    //         btn.classList.add('active');
    //         let src = btn.getAttribute('data-src');
    //         document.querySelector('#video-slider').src = src;
    //     });
    // });
    // }, [])
    
    // const videoClick = (btn) => {
    //     document.querySelector('.controls .active').classList.remove('active');
    //     btn.classList.add('active');
    //     let src = btn.getAttribute('data-src');
    //     document.getElementById('video-slider').src = src;
    //     console.log(src)
    // }
    const action = 'active';
    const setState = (vid, active) => {
        setVideo(vid)
        setActiveMark(active)
    }
    return (

        <section className="home" id="home">
            <div className="content">
                <h3>adventure is worthwhile</h3>
                <p>discover new places with us, adventure awaits</p>
                <a href="#" className="btn">discover more</a>
            </div>
            <div className="controls">
                <span className={activeMark == 1 ? `vid-btn ${action}` : `vid-btn`} onClick={()=> setState("./.mp4/DD.mp4", 1)} data-src={video} />
                <span className={activeMark == 2 ? `vid-btn ${action}` : `vid-btn`} onClick={()=> setState("./.mp4/v1.mp4", 2)} data-src={video}/>
                <span className={activeMark == 3 ? `vid-btn ${action}` : `vid-btn`} onClick={()=> setState("./.mp4/white.mp4", 3)} data-src={video}/>
                <span className={activeMark == 4 ? `vid-btn ${action}` : `vid-btn`} onClick={()=> setState("./.mp4/vid-4.mp4", 4)} data-src={video}/>
                <span className={activeMark == 5 ? `vid-btn ${action}` : `vid-btn`} onClick={()=> setState("./.mp4/vid-5.mp4", 5)} data-src={video}/>
            </div>
            <div className="video-container">
                <video src={video} id="video-slider" loop autoPlay muted />
            </div>
        </section>
    );
}

export default HomeSection;