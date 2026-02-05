import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, User, Bot, Clock, Users, Camera, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { profileAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { getImageUrl } from '../../utils/imageUtils';

interface ProfileData {
    profilePhoto: string | null;
    aiTools: number;
    hoursSaved: number;
    clients: number;
}

const defaultProfile: ProfileData = {
    profilePhoto: null,
    aiTools: 15,
    hoursSaved: 500,
    clients: 50,
};

export default function AdminProfile() {
    const { success, error } = useToast();
    const [profile, setProfile] = useState<ProfileData>(defaultProfile);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await profileAPI.get();
            if (response.data.data) {
                setProfile({ ...defaultProfile, ...response.data.data });
                if (response.data.data.profilePhoto) {
                    setPreviewUrl(getImageUrl(response.data.data.profilePhoto));
                }
            }
        } catch (err: any) {
            console.error('Failed to fetch profile:', err);
            const msg = err.response?.data?.message || err.message;
            error(`Failed to load profile: ${msg}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setProfile({ ...profile, profilePhoto: null });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const formData = new FormData();
            formData.append('aiTools', String(profile.aiTools));
            formData.append('hoursSaved', String(profile.hoursSaved));
            formData.append('clients', String(profile.clients));

            if (selectedFile) {
                formData.append('profilePhoto', selectedFile);
            } else if (profile.profilePhoto === null) {
                formData.append('profilePhoto', ''); // Signal to clear
            }

            const response = await profileAPI.update(formData);
            success('Profile updated successfully');
            if (response.data.data.profilePhoto) {
                setProfile({ ...profile, profilePhoto: response.data.data.profilePhoto });
                setPreviewUrl(getImageUrl(response.data.data.profilePhoto));
                setSelectedFile(null);
            }
        } catch (err: any) {
            console.error(err);
            const serverMessage = err.response?.data?.message || err.message;
            error(`Error: ${serverMessage}`);
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
            className="space-y-8 max-w-4xl"
        >
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Manage your hero section profile and stats
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Photo Upload */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 w-full flex items-center gap-2">
                            <Camera className="w-5 h-5 text-indigo-600" />
                            Photo
                        </h2>

                        <div className="relative group">
                            <div className="w-48 h-48 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-16 h-16 text-gray-400" />
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center rounded-2xl"
                            >
                                <Camera className="w-8 h-8 mb-2" />
                                <span>Change Photo</span>
                            </button>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />

                        {previewUrl && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={removePhoto}
                                className="mt-4 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove Photo
                            </Button>
                        )}

                        <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
                            Recommended: Square image (800x800px)
                        </p>
                    </div>
                </div>

                {/* Hero Stats */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <Bot className="w-5 h-5 text-indigo-600" />
                            Hero Section Stats
                        </h2>

                        <div className="grid gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                    <Bot className="w-4 h-4" />
                                    AI Tools Built
                                </label>
                                <Input
                                    type="number"
                                    value={profile.aiTools}
                                    onChange={(e) => setProfile({ ...profile, aiTools: parseInt(e.target.value) || 0 })}
                                    placeholder="e.15"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Hours Saved
                                </label>
                                <Input
                                    type="number"
                                    value={profile.hoursSaved}
                                    onChange={(e) => setProfile({ ...profile, hoursSaved: parseInt(e.target.value) || 0 })}
                                    placeholder="e.g. 500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Clients Served
                                </label>
                                <Input
                                    type="number"
                                    value={profile.clients}
                                    onChange={(e) => setProfile({ ...profile, clients: parseInt(e.target.value) || 0 })}
                                    placeholder="e.g. 50"
                                />
                            </div>
                        </div>

                        <p className="mt-6 text-sm text-gray-500 italic">
                            * The "+" suffix will be added automatically on the public site.
                        </p>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[150px]"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Profile
                        </>
                    )}
                </Button>
            </div>
        </motion.div>
    );
}
