import { AppSidebar } from "@/components/AppSidebar";
import { Feed } from "@/components/Feed";
import { AIChatPanel } from "@/components/AIChatPanel";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto scrollbar-hidden">
        <Feed />
      </main>
      <AIChatPanel />
    </div>
  );
};

export default Index;
