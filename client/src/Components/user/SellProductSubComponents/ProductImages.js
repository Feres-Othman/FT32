import React, { useContext } from 'react'
import { DesignContext } from '../../../DesignContext'
import { RContext } from '../../../RContext'
// import PlusIcon from '../../../Medias/add.png'
// import ImageInput from "../../../Molecules/ImageInput";

export default function ProductImages({ handleChoose, handleCancel, pictures }) {

    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)
    const { design } = useContext(DesignContext)

    return (
        <div style={{
            minHeight: isSmall ? "15vh" : isMedium ? '10vh' : isLarge ? '10vh' : '20vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "space-around",
            width: isSmall ? "95%" : isMedium ? 600 : isLarge ? 800 : 700,
            maxWidth: "95%",
            padding: 20,
            borderRadius: 30,
            border: `2px solid ${design.backgroundColor}`,
            backgroundColor: design.backgroundColor,
            filter: 'drop-shadow(4px 6px 8px #555)',
        }}>

            <div style={{ paddingBottom: 10 }}>
                <div>Ajouter jusqu'a 5 photos</div>
            </div>
            <div key={Math.random() + Date.now()} style={{ display: 'flex', flexDirection: 'row', gap: 30, flexWrap: 'wrap', justifyContent: 'center' }}>
                {/* {pictures.length >= 5 ?
                    <>
                        {[...pictures].map((item, index) => {
                            // return <ImageInput compressed={index == 0} force={item} key={item} onUpload={handleChoose} onCancel={handleCancel} />
                        })}
                    </>
                    : <>
                        {[...pictures, ""].map((item, index) => {
                            // return <ImageInput compressed={index == 0} force={item} key={item} onUpload={handleChoose} onCancel={handleCancel} />
                        })}
                    </>} */}



                {/* <ImageInput onUpload={handleChoose} onCancel={handleCancel} />
                <ImageInput onUpload={handleChoose} onCancel={handleCancel} />
                <ImageInput onUpload={handleChoose} onCancel={handleCancel} />
                <ImageInput onUpload={handleChoose} onCancel={handleCancel} /> */}

            </div>

        </div>
    )
}
