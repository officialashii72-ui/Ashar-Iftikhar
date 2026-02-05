import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { testimonialsAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { getImageUrl } from '../../utils/imageUtils';

export default function TestimonialForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { success, error } = useToast();
    const isEditing = Boolean(id);

    const [isLoading, setIsLoading] = useState(isEditing);
    const [isSaving, setIsSaving] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        company: '',
        content: '',
        rating: 5,
        featured: false,
        avatar: null as File | null,
    });

    useEffect(() => {
        if (isEditing && id) {
            fetchTestimonial(id);
        }
    }, [id]);

    const fetchTestimonial = async (testimonialId: string) => {
        try {
            const response = await testimonialsAPI.getById(testimonialId);
            setFormData({
                ...response.data.data,
                avatar: null,
            });
            if (response.data.data.avatar) setImagePreview(getImageUrl(response.data.data.avatar));
        } catch (err) {
            error('Failed to fetch testimonial details');
            navigate('/admin/testimonials');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, avatar: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
        if (e) e.preventDefault();
        setIsSaving(true);

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'avatar') {
                    if (value instanceof File) data.append('avatar', value);
                } else if (typeof value === 'boolean') {
                    data.append(key, value ? 'true' : 'false');
                } else {
                    data.append(key, String(value));
                }
            });

            if (isEditing && id) {
                const response = await testimonialsAPI.update(id, data);
                if (response.data.success) {
                    success('Testimonial updated successfully');
                    navigate('/admin/testimonials');
                } else {
                    throw new Error(response.data.message || 'Failed to update testimonial');
                }
            } else {
                const response = await testimonialsAPI.create(data);
                if (response.data.success) {
                    success('Testimonial created successfully');
                    navigate('/admin/testimonials');
                } else {
                    throw new Error(response.data.message || 'Failed to create testimonial');
                }
            }
        } catch (err: any) {
            console.error('Save error:', err);
            error(err.response?.data?.message || err.message || 'Failed to save testimonial');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/admin/testimonials')}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {isEditing ? 'Edit Testimonial' : 'New Testimonial'}
                    </h1>
                </div>
                <Button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    {isSaving ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4 mr-2" />
                    )}
                    Save Testimonial
                </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center md:text-left">
                                Avatar
                            </label>
                            <div className="relative group w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition-colors">
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="text-white text-[10px]"
                                                onClick={() => document.getElementById('avatar-upload')?.click()}
                                            >
                                                Change
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('avatar-upload')?.click()}
                                        className="w-full h-full flex flex-col items-center justify-center text-gray-400"
                                    >
                                        <Plus className="w-6 h-6" />
                                    </button>
                                )}
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        <div className="flex-1 grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Client Name
                                </label>
                                <Input
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Role / Position
                                </label>
                                <Input
                                    required
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    placeholder="CEO, Marketing Manager"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Company
                                </label>
                                <Input
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    placeholder="Acme Corp"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Rating
                                </label>
                                <div className="flex items-center gap-2 mt-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`w-6 h-6 ${star <= formData.rating
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Testimonial Content
                        </label>
                        <textarea
                            required
                            rows={4}
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="What did the client say about your work?"
                        />
                    </div>

                    <div className="pt-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show on Home Page (Featured)</span>
                        </label>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
