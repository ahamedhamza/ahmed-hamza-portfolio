import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Trash2, Plus, GripVertical } from "lucide-react";

interface Social {
    id: string;
    platform: string;
    url: string;
    label: string;
    icon_name: string;
    display_order: number;
}

const SocialsForm = () => {
    const [socials, setSocials] = useState<Social[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSocials = async () => {
        try {
            const { data, error } = await supabase
                .from("socials")
                .select("*")
                .order("display_order", { ascending: true });

            if (error) throw error;
            setSocials(data || []);
        } catch (error) {
            console.error("Error fetching socials:", error);
            toast.error("Failed to load socials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSocials();
    }, []);

    const handleAddSocial = async () => {
        try {
            const newSocial = {
                platform: "New Platform",
                url: "https://",
                label: "Label",
                icon_name: "Link",
                display_order: socials.length,
            };

            const { data, error } = await supabase
                .from("socials")
                .insert([newSocial])
                .select()
                .single();

            if (error) throw error;
            setSocials([...socials, data]);
            toast.success("Social link added");
        } catch (error) {
            console.error("Error adding social:", error);
            toast.error("Failed to add social link");
        }
    };

    const handleUpdateSocial = async (id: string, field: keyof Social, value: string | number) => {
        // Optimistic update
        const updatedSocials = socials.map((s) =>
            s.id === id ? { ...s, [field]: value } : s
        );
        setSocials(updatedSocials);

        try {
            const { error } = await supabase
                .from("socials")
                .update({ [field]: value })
                .eq("id", id);

            if (error) throw error;
        } catch (error) {
            console.error("Error updating social:", error);
            toast.error("Failed to update social link");
            // Revert on error (could be improved)
            fetchSocials();
        }
    };

    const handleDeleteSocial = async (id: string) => {
        if (!confirm("Are you sure you want to delete this link?")) return;

        try {
            const { error } = await supabase.from("socials").delete().eq("id", id);
            if (error) throw error;
            setSocials(socials.filter((s) => s.id !== id));
            toast.success("Social link deleted");
        } catch (error) {
            console.error("Error deleting social:", error);
            toast.error("Failed to delete social link");
        }
    };

    if (loading) return <div>Loading socials...</div>;

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Social Links</h2>
                <Button onClick={handleAddSocial} size="sm">
                    <Plus className="w-4 h-4 mr-2" /> Add Link
                </Button>
            </div>

            <div className="space-y-4">
                {socials.map((social) => (
                    <div
                        key={social.id}
                        className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg"
                    >
                        <div className="mt-3 text-muted-foreground cursor-move">
                            <GripVertical size={20} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            <div className="space-y-2">
                                <Label>Platform</Label>
                                <Input
                                    value={social.platform}
                                    onChange={(e) => handleUpdateSocial(social.id, "platform", e.target.value)}
                                    placeholder="e.g. Twitter"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Label</Label>
                                <Input
                                    value={social.label}
                                    onChange={(e) => handleUpdateSocial(social.id, "label", e.target.value)}
                                    placeholder="e.g. Twitter"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>URL</Label>
                                <Input
                                    value={social.url}
                                    onChange={(e) => handleUpdateSocial(social.id, "url", e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Icon Name (Lucide React)</Label>
                                <Input
                                    value={social.icon_name}
                                    onChange={(e) => handleUpdateSocial(social.id, "icon_name", e.target.value)}
                                    placeholder="e.g. Twitter"
                                />
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive/90 mt-8"
                            onClick={() => handleDeleteSocial(social.id)}
                        >
                            <Trash2 size={20} />
                        </Button>
                    </div>
                ))}

                {socials.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
                        No social links added yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SocialsForm;
