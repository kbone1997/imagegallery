import React, { useState } from 'react';
import FlipMove from 'react-flip-move';
import images from '../images';
import './Gallery.css';
import SingleImage from "./SingleImage"
import { FaTrash } from 'react-icons/fa';
import { MdAddAPhoto } from "react-icons/md";
import { HiRefresh } from "react-icons/hi";

interface ImageData {
    id: string;
    src: string;
    isSelected: boolean;
}

const generateInitialImages = () => {
    return images.map((src, index) => ({
        id: String(index),
        src,
        isSelected: false,
    }));
};


const ImageGallery: React.FC = () => {
    const [imageList, setImageList] = useState<ImageData[]>(generateInitialImages());
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [isFeatured, setIsFeatured] = useState<string>("0");
    const selectedImages = imageList.filter(image => image.isSelected);
    const isAnyImageSelected = selectedImages.length > 0;

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDrop = (index: number) => {
        if (index !== draggedIndex && draggedIndex !== null) {
            const updatedImages = [...imageList];
            const draggedImage = updatedImages[draggedIndex];
            updatedImages.splice(draggedIndex, 1);
            updatedImages.splice(index, 0, draggedImage);
            setImageList(updatedImages);
            setIsFeatured(updatedImages[0].id);
            setDraggedIndex(null); // Reset draggedIndex after drop
        }
    };

    const handleImageClick = (id: string) => {
        const updatedImages = imageList.map((image) =>
            image.id === id ? { ...image, isSelected: !image.isSelected } : image
        );
        setImageList(updatedImages);
    };

    const handleDelete = () => {
        const updatedImages = imageList.filter((image) => !image.isSelected);
        setImageList(updatedImages);
        if (updatedImages.length > 0) {
            setIsFeatured(updatedImages[0].id)
        }
    };

    const handleAddNew = () => {

    };

    return (
        <div>
            {imageList.length > 0 ? (
                <div className="gallery-container">
                    {isAnyImageSelected ? (
                        <div className="message-box selected-list">
                            <p className="message-text">Number of selected images: <span className="selected-count">{selectedImages.length}</span></p>
                            <button className="button" onClick={handleDelete}>
                                Delete Selected <FaTrash style={{ marginLeft: '5px' }} />
                            </button>
                        </div>
                    ) : (
                        <div className="message-box no-selection">
                            <p className="message-text">No images selected. Select images to see options.</p>
                            <button className="button secondary" onClick={handleAddNew}>Add Images<MdAddAPhoto style={{ marginLeft: '5px' }} /></button>
                        </div>
                    )}
                    <FlipMove className="image-grid">
                        {imageList.map((image, index) => (
                            <div
                                style={{ transform: 'translateX(0px)', opacity: 1 }}
                                key={image.src}
                                className={`image-item ${image.id === isFeatured ? 'featured' : ''}`}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={(e) => e.preventDefault()} // Prevent default dragover behavior
                                onDrop={() => handleDrop(index)} // Call handleDrop on drop event
                            >
                                <SingleImage src={image.src} onClick={() => handleImageClick(image.id)} onDelete={handleDelete} isSelected={image.isSelected} isFeatured={(image.id === isFeatured)} />
                            </div>
                        ))}
                    </FlipMove>
                </div>
            ) : (
                <div className="message-box empty-list">
                    <p className="message-text">No images found. Refresh to respawn</p>
                    <button className="button refresh" onClick={() => window.location.reload()}>
                        Refresh <HiRefresh style={{ marginLeft: '5px' }} />
                    </button>

                </div>
            )}
        </div>
    );
};

export default ImageGallery;
