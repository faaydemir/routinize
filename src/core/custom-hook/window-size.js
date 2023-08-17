import { useState, useEffect } from 'react';
import isMobileWindow from 'core/screen-size';
 
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
 
 
export function useIsMobileWindow() {
    const [windowDimensions, setWindowDimensions] = useState(isMobileWindow());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(isMobileWindow());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
 
    return windowDimensions;
}
 
 
export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
 
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
 
    return windowDimensions;
} 