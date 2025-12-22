import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { Session } from "@supabase/supabase-js";

const Admin = () => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (!session) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background">
                <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg border border-border">
                    <h1 className="text-2xl font-bold text-center mb-6 text-foreground">Admin Login</h1>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        theme="dark"
                        providers={[]}
                        view="sign_in"
                        showLinks={false}
                    />
                </div>
            </div>
        );
    }

    return <AdminDashboard session={session} />;
};

export default Admin;
