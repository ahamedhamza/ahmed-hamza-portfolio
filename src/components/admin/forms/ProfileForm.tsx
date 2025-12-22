import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Profile {
    id: string;
    name: string;
    tagline: string;
    location: string;
    year: string;
    bio_intro: string;
    bio_body: string;
    image_url: string;
}

const ProfileForm = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const { data, error } = await supabase
                .from("profile")
                .select("*")
                .single();

            if (error) {
                console.error("Error fetching profile:", error);
            } else if (data) {
                setProfile(data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleUpdateProfile = async (field: keyof Profile, value: string) => {
        if (!profile) return;

        // Optimistic update
        setProfile({ ...profile, [field]: value });

        try {
            const { error } = await supabase
                .from("profile")
                .update({ [field]: value })
                .eq("id", profile.id);

            if (error) throw error;
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
            // Revert on error
            fetchProfile();
        }
    };

    if (loading) return <div>Loading profile...</div>;

    if (!profile) {
        return (
            <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
                No profile found. Please run the database schema script.
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-semibold">Profile Settings</h2>

            <div className="p-6 bg-card border border-border rounded-lg space-y-6">
                <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                        value={profile.name || ""}
                        onChange={(e) => handleUpdateProfile("name", e.target.value)}
                        placeholder="Your Name"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Tagline</Label>
                    <Input
                        value={profile.tagline || ""}
                        onChange={(e) => handleUpdateProfile("tagline", e.target.value)}
                        placeholder="Crafting digital interfaces"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                            value={profile.location || ""}
                            onChange={(e) => handleUpdateProfile("location", e.target.value)}
                            placeholder="India"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Year</Label>
                        <Input
                            value={profile.year || ""}
                            onChange={(e) => handleUpdateProfile("year", e.target.value)}
                            placeholder="20 25"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Bio Intro</Label>
                    <Input
                        value={profile.bio_intro || ""}
                        onChange={(e) => handleUpdateProfile("bio_intro", e.target.value)}
                        placeholder="I design digital interfaces"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Bio Body</Label>
                    <Textarea
                        value={profile.bio_body || ""}
                        onChange={(e) => handleUpdateProfile("bio_body", e.target.value)}
                        placeholder="Full bio description..."
                        className="min-h-[150px]"
                    />
                </div>

                <div className="space-y-2">
                    <Label>About Page Image URL</Label>
                    <Input
                        value={profile.image_url || ""}
                        onChange={(e) => handleUpdateProfile("image_url", e.target.value)}
                        placeholder="https://example.com/your-image.jpg"
                    />
                    {profile.image_url && (
                        <div className="mt-2">
                            <img
                                src={profile.image_url}
                                alt="Preview"
                                className="max-h-32 rounded-lg object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>

            <p className="text-sm text-muted-foreground">
                Changes are saved automatically as you type.
            </p>
        </div>
    );
};

export default ProfileForm;
