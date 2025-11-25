import { ChatBox } from "@/components/chat-box";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function ChatPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Chat Assistant</h1>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <p className="text-muted-foreground">
        Your personal assistant for any questions you have.
      </p>

      <div className="pt-6">
        <ChatBox />
      </div>
    </div>
  );
}
