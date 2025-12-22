import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Trash2, Plus, GripVertical } from "lucide-react";

interface Experience {
    id: string;
    title: string;
    company: string;
    period: string;
    display_order: number;
}

const ExperienceForm = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchExperiences = async () => {
        try {
            const { data, error } = await supabase
                .from("experience")
                .select("*")
                .order("display_order", { ascending: true });

            if (error) throw error;
            setExperiences(data || []);
        } catch (error) {
            console.error("Error fetching experience:", error);
            toast.error("Failed to load experience");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleAddExperience = async () => {
        try {
            const newExperience = {
                title: "Job Title",
                company: "Company Name",
                period: "Year - Year",
                display_order: experiences.length,
            };

            const { data, error } = await supabase
                .from("experience")
                .insert([newExperience])
                .select()
                .single();

            if (error) throw error;
            setExperiences([...experiences, data]);
            toast.success("Experience added");
        } catch (error) {
            console.error("Error adding experience:", error);
            toast.error("Failed to add experience");
        }
    };

    const handleUpdateExperience = async (id: string, field: keyof Experience, value: string | number) => {
        const updatedExperiences = experiences.map((e) =>
            e.id === id ? { ...e, [field]: value } : e
        );
        setExperiences(updatedExperiences);

        try {
            const { error } = await supabase
                .from("experience")
                .update({ [field]: value })
                .eq("id", id);

            if (error) throw error;
        } catch (error) {
            console.error("Error updating experience:", error);
            toast.error("Failed to update experience");
            fetchExperiences();
        }
    };

    const handleDeleteExperience = async (id: string) => {
        if (!confirm("Are you sure you want to delete this experience?")) return;

        try {
            const { error } = await supabase.from("experience").delete().eq("id", id);
            if (error) throw error;
            setExperiences(experiences.filter((e) => e.id !== id));
            toast.success("Experience deleted");
        } catch (error) {
            console.error("Error deleting experience:", error);
            toast.error("Failed to delete experience");
        }
    };

    if (loading) return <div>Loading experience...</div>;

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Work Experience</h2>
                <Button onClick={handleAddExperience} size="sm">
                    <Plus className="w-4 h-4 mr-2" /> Add Experience
                </Button>
            </div>

            <div className="space-y-4">
                {experiences.map((exp) => (
                    <div
                        key={exp.id}
                        className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg"
                    >
                        <div className="mt-3 text-muted-foreground cursor-move">
                            <GripVertical size={20} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={exp.title}
                                    onChange={(e) => handleUpdateExperience(exp.id, "title", e.target.value)}
                                    placeholder="Job Title"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Company</Label>
                                <Input
                                    value={exp.company}
                                    onChange={(e) => handleUpdateExperience(exp.id, "company", e.target.value)}
                                    placeholder="Company Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Period</Label>
                                <Input
                                    value={exp.period}
                                    onChange={(e) => handleUpdateExperience(exp.id, "period", e.target.value)}
                                    placeholder="e.g. 2023 - Present"
                                />
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive/90 mt-8"
                            onClick={() => handleDeleteExperience(exp.id)}
                        >
                            <Trash2 size={20} />
                        </Button>
                    </div>
                ))}

                {experiences.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
                        No experience added yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExperienceForm;
