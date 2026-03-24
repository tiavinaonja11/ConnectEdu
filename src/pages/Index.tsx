import { Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Feed } from "@/components/Feed";
import { AIChatPanel } from "@/components/AIChatPanel";
import CoursPage from "@/pages/CoursPage";
import RessourcesPage from "@/pages/RessourcesPage";
import CommunautePage from "@/pages/CommunautePage";
import NotificationsPage from "@/pages/NotificationsPage";
import ParametresPage from "@/pages/ParametresPage";
import NotFound from "@/pages/NotFound";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto scrollbar-hidden">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/cours" element={<CoursPage />} />
          <Route path="/ressources" element={<RessourcesPage />} />
          <Route path="/communaute" element={<CommunautePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/parametres" element={<ParametresPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <AIChatPanel />
    </div>
  );
};

export default Index;
