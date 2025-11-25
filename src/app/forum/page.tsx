import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageSquare } from "lucide-react";
import type { ForumPost } from "@/lib/types";
import { SidebarTrigger } from "@/components/ui/sidebar";

const forumPosts: ForumPost[] = [
  {
    id: 1,
    author: "Anjali Gupta",
    authorImage: "https://picsum.photos/seed/anjali/40/40",
    title: "Question about the new telemedicine service hours",
    excerpt: "Does anyone know if the new telemedicine service is available on weekends? I tried calling but couldn't get through. Any information would be helpful!",
    comments: 5,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    author: "Ravi Kumar",
    authorImage: "https://picsum.photos/seed/ravi/40/40",
    title: "Sharing my experience with the digital payments tutorial",
    excerpt: "The video on digital payments was very clear! I was able to set up my UPI and make my first transaction today. Feeling very empowered. Thanks to the team!",
    comments: 12,
    timestamp: "1 day ago",
  },
  {
    id: 3,
    author: "Suman Singh",
    authorImage: "https://picsum.photos/seed/suman/40/40",
    title: "Help needed with filling out the online scholarship form",
    excerpt: "I'm trying to apply for the student scholarship online, but I'm stuck on the document upload section. Can someone guide me through the steps?",
    comments: 8,
    timestamp: "3 days ago",
  },
];


export default function ForumPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Community Forum</h1>
         <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <p className="text-muted-foreground">
        Connect, share, and get help from your community.
      </p>

      <Card className="mt-6">
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {forumPosts.map((post) => (
              <li key={post.id} className="p-4 md:p-6 hover:bg-secondary/50 transition-colors">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={post.authorImage} alt={post.author} data-ai-hint="person portrait" />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1 font-headline">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                       <span className="font-medium text-foreground">{post.author}</span>
                       <span>&middot;</span>
                       <span>{post.timestamp}</span>
                       <span>&middot;</span>
                       <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{post.comments} comments</span>
                       </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
