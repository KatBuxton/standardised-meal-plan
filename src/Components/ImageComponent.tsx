import React, { useState, useEffect, useRef } from 'react';
import {Spinner} from "./Spinner";

interface ImageComponentProps {
    imageUrl: string;
}

const resizeImage = (imagePath: string, width: number, height: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            ctx && ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg'));
        };
        img.onerror = reject;
        img.src = imagePath;
    });
};

export const ImageComponent: React.FC<ImageComponentProps> = ({ imageUrl }) => {
    const [containerSize, setContainerSize] = useState({ width: 500, height: 500 });
    const [resizedImage, setResizedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const handleResize = () => {
        if (containerRef.current) {
            setContainerSize({
                width: containerRef.current.clientWidth,
                height: containerRef.current.clientHeight,
            });
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);
        resizeImage(imageUrl, containerSize.width, containerSize.height)
            .then((dataUrl) => {
                setResizedImage(dataUrl);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Image resizing error:', error);
                setIsLoading(false);
            });
    }, [imageUrl, containerSize]);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {isLoading && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900">
                    <Spinner />
                </div>
            )}
            <img
                ref={imageRef}
                src={resizedImage || imageUrl}
                alt="Resized Image"
                loading="lazy"
                className="h-full w-full object-cover object-center"
                onLoad={handleImageLoad}
            />
        </div>
    );
};
