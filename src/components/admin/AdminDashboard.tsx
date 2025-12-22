import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import ProfileForm from "./forms/ProfileForm";
import SocialsForm from "./forms/SocialsForm";
import ProjectForm from "./forms/ProjectForm";
import ExperienceForm from "./forms/ExperienceForm";
import SkillsForm from "./forms/SkillsForm";

interface AdminDashboardProps {
    session: Session;
}

const AdminDashboard = ({ session }: AdminDashboardProps) => {
    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <div className="fixed inset-0 bg-background p-8 overflow-auto z-50">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-light text-foreground">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{session.user.email}</span>
                        <Button variant="outline" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-5 mb-8">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="socials">Socials</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="skills">Skills & Awards</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-4">
                        <ProfileForm />
                    </TabsContent>

                    <TabsContent value="socials" className="space-y-4">
                        <SocialsForm />
                    </TabsContent>

                    <TabsContent value="projects" className="space-y-4">
                        <ProjectForm />
                    </TabsContent>

                    <TabsContent value="experience" className="space-y-4">
                        <ExperienceForm />
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-4">
                        <SkillsForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default AdminDashboard;
