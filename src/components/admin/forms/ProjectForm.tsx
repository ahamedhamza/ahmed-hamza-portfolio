import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Trash2, Plus, GripVertical, Image as ImageIcon } from "lucide-react";

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    link: string;
    image_url: string;
    gradient_start: string;
    gradient_end: string;
    display_order: number;
}

const ProjectForm = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("display_order", { ascending: true });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error("Error fetching projects:", error);
            toast.error("Failed to load projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleAddProject = async () => {
        try {
            const newProject = {
                title: "New Project",
                category: "Web Design",
                description: "Project description goes here...",
                link: "https://",
                image_url: "",
                gradient_start: "from-purple-600/20",
                gradient_end: "to-blue-600/20",
                display_order: projects.length,
            };

            const { data, error } = await supabase
                .from("projects")
                .insert([newProject])
                .select()
                .single();

            if (error) throw error;
            setProjects([...projects, data]);
            toast.success("Project added");
        } catch (error) {
            console.error("Error adding project:", error);
            toast.error("Failed to add project");
        }
    };

    const handleUpdateProject = async (id: string, field: keyof Project, value: string | number) => {
        const updatedProjects = projects.map((p) =>
            p.id === id ? { ...p, [field]: value } : p
        );
        setProjects(updatedProjects);

        try {
            const { error } = await supabase
                .from("projects")
                .update({ [field]: value })
                .eq("id", id);

            if (error) throw error;
        } catch (error) {
            console.error("Error updating project:", error);
            toast.error("Failed to update project");
            fetchProjects();
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (error) throw error;
            setProjects(projects.filter((p) => p.id !== id));
            toast.success("Project deleted");
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Failed to delete project");
        }
    };

    if (loading) return <div>Loading projects...</div>;

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Projects</h2>
                <Button onClick={handleAddProject} size="sm">
                    <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
            </div>

            <div className="space-y-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg"
                    >
                        <div className="mt-3 text-muted-foreground cursor-move">
                            <GripVertical size={20} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={project.title}
                                    onChange={(e) => handleUpdateProject(project.id, "title", e.target.value)}
                                    placeholder="Project Title"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Input
                                    value={project.category}
                                    onChange={(e) => handleUpdateProject(project.id, "category", e.target.value)}
                                    placeholder="e.g. Web Design"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={project.description}
                                    onChange={(e) => handleUpdateProject(project.id, "description", e.target.value)}
                                    placeholder="Project description..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Link</Label>
                                <Input
                                    value={project.link}
                                    onChange={(e) => handleUpdateProject(project.id, "link", e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Image URL</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={project.image_url}
                                        onChange={(e) => handleUpdateProject(project.id, "image_url", e.target.value)}
                                        placeholder="https://... or /path/to/image"
                                    />
                                    {/* Placeholder for actual image upload logic later if needed */}
                                    <Button variant="outline" size="icon" title="Upload Image (Coming Soon)">
                                        <ImageIcon size={16} />
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Gradient Start (Tailwind Class)</Label>
                                <Input
                                    value={project.gradient_start}
                                    onChange={(e) => handleUpdateProject(project.id, "gradient_start", e.target.value)}
                                    placeholder="from-purple-600/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Gradient End (Tailwind Class)</Label>
                                <Input
                                    value={project.gradient_end}
                                    onChange={(e) => handleUpdateProject(project.id, "gradient_end", e.target.value)}
                                    placeholder="to-blue-600/20"
                                />
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive/90 mt-10"
                            onClick={() => handleDeleteProject(project.id)}
                        >
                            <Trash2 size={20} />
                        </Button>
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
                        No projects added yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectForm;
