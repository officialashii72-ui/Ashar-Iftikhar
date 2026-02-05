import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { projectsAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { getImageUrl } from '../../utils/imageUtils';

export default function ProjectForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { success, error } = useToast();
    const isEditing = Boolean(id);

    const [isLoading, setIsLoading] = useState(isEditing);
    const [isSaving, setIsSaving] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        shortDescription: '',
        category: '',
        client: '',
        timeline: '',
        results: '',
        featured: false,
        published: true,
        tags: [] as string[],
        technologies: [] as string[],
        image: null as File | null,
    });

    const [tagInput, setTagInput] = useState('');
    const [techInput, setTechInput] = useState('');

    useEffect(() => {
        if (isEditing && id) {
            fetchProject(id);
        }
    }, [id]);

    const fetchProject = async (projectId: string) => {
        try {
            const response = await projectsAPI.getById(projectId);
            const project = response.data.data;
            setFormData({
                ...project,
                image: null, // Don't clear existing image
            });
            if (project.image) setImagePreview(getImageUrl(project.image));
        } catch (err) {
            error('Failed to fetch project details');
            navigate('/admin/projects');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) });
    };

    const handleAddTech = () => {
        if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
            setFormData({ ...formData, technologies: [...formData.technologies, techInput.trim()] });
            setTechInput('');
        }
    };

    const handleRemoveTech = (techToRemove: string) => {
        setFormData({ ...formData, technologies: formData.technologies.filter(t => t !== techToRemove) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'image') {
                    if (value instanceof File) data.append('image', value);
                } else if (Array.isArray(value)) {
                    value.forEach(v => data.append(`${key}[]`, v));
                } else if (typeof value === 'boolean') {
                    data.append(key, value ? 'true' : 'false');
                } else {
                    data.append(key, String(value));
                    // Duplicate client field as clientName for backend compatibility
                    if (key === 'client') data.append('clientName', String(value));
                }
            });

            if (isEditing && id) {
                const response = await projectsAPI.update(id, data);
                if (response.data.success) {
                    success('Project updated successfully');
                    navigate('/admin/projects');
                } else {
                    throw new Error(response.data.message || 'Failed to update project');
                }
            } else {
                const response = await projectsAPI.create(data);
                if (response.data.success) {
                    success('Project created successfully');
                    navigate('/admin/projects');
                } else {
                    throw new Error(response.data.message || 'Failed to create project');
                }
            }
        } catch (err: any) {
            console.error('Save error:', err);
            error(err.response?.data?.message || err.message || 'Failed to save project');
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
            className="max-w-4xl mx-auto space-y-6"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/admin/projects')}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {isEditing ? 'Edit Project' : 'New Project'}
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
                    Save Project
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    {/* Main Info */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Project Title
                            </label>
                            <Input
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enter project title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Short Description
                            </label>
                            <Input
                                required
                                value={formData.shortDescription}
                                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                placeholder="Brief summary for cards"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Full Description
                            </label>
                            <textarea
                                required
                                rows={6}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Detailed project description"
                            />
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Project Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Category
                                </label>
                                <Input
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="e.g. AI Automation"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Client Name
                                </label>
                                <Input
                                    value={formData.client}
                                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                    placeholder="Client or Company"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Timeline
                                </label>
                                <Input
                                    value={formData.timeline}
                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                    placeholder="e.g. 3 Months"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Main Result
                                </label>
                                <Input
                                    value={formData.results}
                                    onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                                    placeholder="e.g. 40% efficiency increase"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Image Upload */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Featured Image</h3>
                        <div className="relative group aspect-video bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition-colors">
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="text-white"
                                            onClick={() => document.getElementById('project-image')?.click()}
                                        >
                                            Change Image
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('project-image')?.click()}
                                    className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500"
                                >
                                    <Plus className="w-8 h-8" />
                                    <span className="text-sm">Upload Image</span>
                                </button>
                            )}
                            <input
                                id="project-image"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Tags</h3>
                        <div className="flex gap-2">
                            <Input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                placeholder="Add tag..."
                            />
                            <Button type="button" size="icon" onClick={handleAddTag}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map(tag => (
                                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-medium">
                                    {tag}
                                    <button type="button" onClick={() => handleRemoveTag(tag)}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Technologies */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Technologies</h3>
                        <div className="flex gap-2">
                            <Input
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                                placeholder="Add tech..."
                            />
                            <Button type="button" size="icon" onClick={handleAddTech}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.technologies.map(tech => (
                                <span key={tech} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
                                    {tech}
                                    <button type="button" onClick={() => handleRemoveTech(tech)}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </motion.div>
    );
}
