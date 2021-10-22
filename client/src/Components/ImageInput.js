import React, { useState, useContext, useRef, useEffect } from "react";
import PlusIcon from '../Medias/add.png'
import { RContext } from "../RContext";
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';

export default function ImageInput({ onCancel, }) {

    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const { isSmall } = useContext(RContext)

    const hiddenFileInput = useRef(null)
    const [image, setImage] = useState()
    // const [preview, setPreview] = useState()
    const [isHover, setIsHover] = useState(false)

    const handleClick = (e) => {
        hiddenFileInput.current.click();
    };

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const handleChange = (e) => {

        if (!e.target.files[0]) {

            // if (onCancel) { onCancel(preview); }
            setImage(null);
            setFiles([]);
            hiddenFileInput.current.value = null;
            return;

        }

        setImage(e.target.files[0]);
        setFiles([{ preview: URL.createObjectURL(e.target.files[0]) }]);

    }

    return (
        <div

            //className="hoverScale"

            {...getRootProps({ className: 'hoverScale dropzone' })}

            onMouseEnter={e => {
                setIsHover(true);
            }}
            onMouseLeave={e => {
                setIsHover(false)
            }}

            style={{ border: files[0]?.preview ? '3px white' : '3px solid white', borderRadius: 10, padding: 10, position: "relative", cursor: "pointer" }}>
            <input type="file" id="add" name="add" accept="image/png, image/jpeg" style={{ display: 'none' }} {...getInputProps()} ref={hiddenFileInput} onChange={handleChange} />
            <img src={files[0]?.preview || PlusIcon} style={{ width: isSmall ? "60vw" : "10vw", height: isSmall ? "60vw" : "10vw", objectFit: "contain", borderRadius: 10 }} onClick={handleClick} />

            {(files[0]?.preview && isHover) &&
                <div
                    onClick={() => {
                        // if (onCancel) onCancel(preview);
                        setImage(null);
                        setFiles([]);
                        hiddenFileInput.current.value = null;
                    }}
                    style={{
                        position: "absolute",
                        top: -10,
                        width: 30,
                        height: 30,
                        right: -10,
                        zIndex: 5,
                        backgroundColor: "#555",
                        borderRadius: '50%',
                        padding: 4,
                        paddingLeft: 9,
                        cursor: "pointer"
                    }} >
                    <Icon icon={faTimes} />
                </div>
            }

        </div>
    )
}
