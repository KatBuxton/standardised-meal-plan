import React, {useState, useEffect, useRef} from 'react';

interface ImageComponentProps {
    imageUrl: string;
}

// Function to resize an image

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
    const [containerSize, setContainerSize] = useState({ width: 500, height: 500 }); // Initial dimensions
    const [resizedImage, setResizedImage] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Handle resizing the container based on its actual size
    const handleResize = () => {
        if (containerRef.current) {
            setContainerSize({
                width: containerRef.current.clientWidth,
                height: containerRef.current.clientHeight,
            });
        }
    };

    useEffect(() => {
        // Add a resize event listener to the window
        window.addEventListener('resize', handleResize);
        // Initialize the container size
        handleResize();

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Call the resizeImage function with the image URL and dynamic container dimensions
        resizeImage(imageUrl, containerSize.width, containerSize.height)
            .then((dataUrl) => {
                setResizedImage(dataUrl);
            })
            .catch((error) => {
                console.error('Image resizing error:', error);
            });
    }, [imageUrl, containerSize]);

    return (
        <img
            src={resizedImage || imageUrl} // Display the resized image if available
            alt="Resized Image"
            loading="lazy"
            className="h-full w-full object-cover object-center"
        />
    );
}
