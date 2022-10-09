import React from 'react'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

function NewsItem({ images, title, content, date, _id, isPublic, deleteConfirm, update, isLoggedIn }) {



    return (
        <div style={{
            width: "45%", minHeight: 700, backgroundColor: "#aaa", marginBottom: 30, padding: 30, borderRadius: 25, border: "2px solid #888", position: "relative"
        }}>
            <h4>{title}</h4>
            <h6>{new Date(date).toLocaleDateString("fr")}</h6>
            <p style={{ marginTop: 25 }}>{content}</p>

            <Carousel images={images.map(im => { return { src: im } })} hasIndexBoard={false} style={{ height: "600px", width: "100%" }} />
            {
                isLoggedIn && <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: 15,
                    right: 15
                }}>
                    <img style={{
                        width: 20,
                        height: 20,
                        marginRight: 15,
                        cursor: "pointer"
                    }}
                        onClick={() => { deleteConfirm(_id) }}
                        src="https://scientiworld.s3.eu-central-1.amazonaws.com/trash.png" />
                    <div>
                        publique : <input type="checkbox" defaultChecked={isPublic} onChange={e => {
                            update(e.target.checked, _id)
                        }} />
                    </div>
                </div>
            }

        </div >
    )
}

export default NewsItem