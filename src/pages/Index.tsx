import { Routes, Route, Navigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Feed } from "@/components/Feed";
import { useAuth } from "@/hooks/use-auth";
import CoursPage from "@/pages/CoursPage";
import RessourcesPage from "@/pages/RessourcesPage";
import CommunautePage from "@/pages/CommunautePage";
import NotificationsPage from "@/pages/NotificationsPage";
import ParametresPage from "@/pages/ParametresPage";
import AIPage from "@/pages/AIPage";
import MessagesPage from "@/pages/MessagesPage";
import CirclePage from "@/pages/CirclePage";
import ProfilPage from "@/pages/ProfilPage";
import NotFound from "@/pages/NotFound";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto scrollbar-hidden">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/cours" element={<CoursPage />} />
          <Route path="/ressources" element={<RessourcesPage />} />
          <Route path="/communaute" element={<CommunautePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/parametres" element={<ParametresPage />} />
          <Route path="/assistant" element={<AIPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/cercle/:slug" element={<CirclePage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default Index;
