import React from 'react'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

function NewsItem({ images, title, content, date }) {
    return (
        <div style={{ width: "45%", height: 700, backgroundColor: "#aaa", marginBottom: 30, padding: 30, borderRadius: 25, border: "2px solid #888" }}>
            <h4>{title}</h4>
            <h6>{date}</h6>
            <p style={{ marginTop: 25 }}>{content}</p>

            <Carousel images={images.map(im => { return { src: im } })} hasIndexBoard={false} style={{ height: "500px", width: "100%" }} />
        </div>
    )
}

export default NewsItem