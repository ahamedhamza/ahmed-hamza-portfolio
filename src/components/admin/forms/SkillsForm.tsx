import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Trash2, Plus, GripVertical } from "lucide-react";

interface Skill {
    id: string;
    name: string;
    category: string;
    display_order: number;
}

interface Award {
    id: string;
    title: string;
    org: string;
    date: string;
    description: string;
    display_order: number;
}

const SkillsForm = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [awards, setAwards] = useState<Award[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const { data: skillsData, error: skillsError } = await supabase
                .from("skills")
                .select("*")
                .order("display_order", { ascending: true });

            const { data: awardsData, error: awardsError } = await supabase
                .from("awards")
                .select("*")
                .order("display_order", { ascending: true });

            if (skillsError) throw skillsError;
            if (awardsError) throw awardsError;

            setSkills(skillsData || []);
            setAwards(awardsData || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load skills/awards");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- Skills Handlers ---
    const handleAddSkill = async () => {
        try {
            const newSkill = {
                name: "New Skill",
                category: "General",
                display_order: skills.length,
            };
            const { data, error } = await supabase.from("skills").insert([newSkill]).select().single();
            if (error) throw error;
            setSkills([...skills, data]);
            toast.success("Skill added");
        } catch (error) {
            console.error("Error adding skill:", error);
            toast.error("Failed to add skill");
        }
    };

    const handleUpdateSkill = async (id: string, name: string) => {
        const updatedSkills = skills.map((s) => (s.id === id ? { ...s, name } : s));
        setSkills(updatedSkills);
        try {
            await supabase.from("skills").update({ name }).eq("id", id);
        } catch (error) {
            console.error("Error updating skill:", error);
        }
    };

    const handleDeleteSkill = async (id: string) => {
        try {
            await supabase.from("skills").delete().eq("id", id);
            setSkills(skills.filter((s) => s.id !== id));
            toast.success("Skill deleted");
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };

    // --- Awards Handlers ---
    const handleAddAward = async () => {
        try {
            const newAward = {
                title: "Award Title",
                org: "Organization",
                date: "Date",
                description: "Description",
                display_order: awards.length,
            };
            const { data, error } = await supabase.from("awards").insert([newAward]).select().single();
            if (error) throw error;
            setAwards([...awards, data]);
            toast.success("Award added");
        } catch (error) {
            console.error("Error adding award:", error);
            toast.error("Failed to add award");
        }
    };

    const handleUpdateAward = async (id: string, field: keyof Award, value: string) => {
        const updatedAwards = awards.map((a) => (a.id === id ? { ...a, [field]: value } : a));
        setAwards(updatedAwards);
        try {
            await supabase.from("awards").update({ [field]: value }).eq("id", id);
        } catch (error) {
            console.error("Error updating award:", error);
        }
    };

    const handleDeleteAward = async (id: string) => {
        if (!confirm("Delete this award?")) return;
        try {
            await supabase.from("awards").delete().eq("id", id);
            setAwards(awards.filter((a) => a.id !== id));
            toast.success("Award deleted");
        } catch (error) {
            console.error("Error deleting award:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-12 max-w-4xl">
            {/* Skills Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Skills</h2>
                    <Button onClick={handleAddSkill} size="sm">
                        <Plus className="w-4 h-4 mr-2" /> Add Skill
                    </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                        <div key={skill.id} className="relative group">
                            <Input
                                value={skill.name}
                                onChange={(e) => handleUpdateSkill(skill.id, e.target.value)}
                                className="w-32 text-center h-10"
                            />
                            <button
                                onClick={() => handleDeleteSkill(skill.id)}
                                className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Awards Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Awards</h2>
                    <Button onClick={handleAddAward} size="sm">
                        <Plus className="w-4 h-4 mr-2" /> Add Award
                    </Button>
                </div>
                <div className="space-y-4">
                    {awards.map((award) => (
                        <div key={award.id} className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                            <div className="mt-3 text-muted-foreground cursor-move">
                                <GripVertical size={20} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        value={award.title}
                                        onChange={(e) => handleUpdateAward(award.id, "title", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Organization</Label>
                                    <Input
                                        value={award.org}
                                        onChange={(e) => handleUpdateAward(award.id, "org", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input
                                        value={award.date}
                                        onChange={(e) => handleUpdateAward(award.id, "date", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        value={award.description}
                                        onChange={(e) => handleUpdateAward(award.id, "description", e.target.value)}
                                        className="h-10 min-h-[40px]"
                                    />
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive/90 mt-8"
                                onClick={() => handleDeleteAward(award.id)}
                            >
                                <Trash2 size={20} />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsForm;
