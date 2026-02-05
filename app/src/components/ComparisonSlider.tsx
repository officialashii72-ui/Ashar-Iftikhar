import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';

interface ComparisonSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
}

export default function ComparisonSlider({
    beforeImage,
    afterImage,
    beforeLabel = 'Before',
    afterLabel = 'After AI Transformation',
}: ComparisonSliderProps) {
    const [isResizing, setIsResizing] = useState(false);
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;
        setSliderPos(percent);
    };

    const onMouseDown = () => setIsResizing(true);
    const onMouseUp = () => setIsResizing(false);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => isResizing && handleMove(e.clientX);
        const onTouchMove = (e: TouchEvent) => isResizing && handleMove(e.touches[0].clientX);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onMouseUp);
        };
    }, [isResizing]);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video rounded-3xl overflow-hidden cursor-ew-resize select-none border border-gray-200 dark:border-gray-800 shadow-2xl"
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}
        >
            {/* After Image (Background) */}
            <img
                src={afterImage}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Labels */}
            <div className="absolute top-4 right-4 z-20">
                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-lg uppercase tracking-wider">
                    {afterLabel}
                </span>
            </div>

            {/* Before Image (Clipped) */}
            <div
                className="absolute inset-0 w-full h-full z-10"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-gray-900/80 backdrop-blur-md text-white text-xs font-bold shadow-lg uppercase tracking-wider">
                        {beforeLabel}
                    </span>
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute inset-y-0 z-30 flex items-center justify-center"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
                <div className="w-1 h-full bg-white shadow-xl" />
                <div className="absolute w-12 h-12 rounded-full bg-white dark:bg-gray-900 shadow-2xl border-4 border-indigo-500 flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
                    <MoveHorizontal className="w-5 h-5 text-indigo-600" />
                </div>
            </div>

            {/* Instruction Overlay */}
            <AnimatePresence>
                {sliderPos === 50 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 pointer-events-none z-40"
                    >
                        <motion.p
                            animate={{ x: [-10, 10, -10] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-white font-bold text-lg drop-shadow-lg flex items-center gap-2"
                        >
                            DRAG TO COMPARE
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
