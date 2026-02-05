import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import type { Testimonial } from '../types';
import { getImageUrl } from '../utils/imageUtils';
import useEmblaCarousel from 'embla-carousel-react';

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 1024px)': { slidesToScroll: 1 }
        }
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    // Auto-scroll logic
    useEffect(() => {
        if (!emblaApi || isHovered) return;

        const intervalId = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [emblaApi, isHovered]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <div
            className="relative w-full max-w-7xl mx-auto px-4 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial._id}
                            className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4 py-8"
                        >
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="h-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${(testimonial.rating || 5) > i ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="relative mb-6">
                                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-indigo-500/10 dark:text-indigo-400/10" />
                                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed relative z-10 italic">
                                            "{testimonial.content}"
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/20">
                                        {testimonial.avatar || testimonial.image ? (
                                            <img
                                                src={getImageUrl(testimonial.avatar || testimonial.image)}
                                                alt={testimonial.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-indigo-500 flex items-center justify-center text-white text-lg font-bold">
                                                {testimonial.name?.[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white leading-tight">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {testimonial.role} {testimonial.company ? `@ ${testimonial.company}` : ''}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation - Minimal Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none">
                <button
                    onClick={scrollPrev}
                    className={`p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-white pointer-events-auto transition-all transform hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 md:block hidden`}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={scrollNext}
                    className={`p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-white pointer-events-auto transition-all transform hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 md:block hidden`}
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Pagination Highlights (Dots) */}
            <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollTo(i)}
                        className={`transition-all duration-300 rounded-full ${selectedIndex === i
                            ? 'w-8 h-2 bg-indigo-600'
                            : 'w-2 h-2 bg-gray-300 dark:bg-gray-700 hover:bg-indigo-400'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
