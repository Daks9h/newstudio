import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpenCheck,
  GraduationCap,
  LineChart,
  MessagesSquare,
  BarChart3,
  ArrowRight,
  Mic,
  FileText,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const features = [
  {
    title: "Service Directory",
    description: "Find local government and healthcare services.",
    href: "/services",
    icon: BookOpenCheck,
  },
  {
    title: "Government Schemes",
    description: "Find and apply for government schemes.",
    href: "/schemes",
    icon: FileText,
  },
  {
    title: "Digital Literacy",
    description: "Improve your digital skills with our interactive course.",
    href: "/resources",
    icon: GraduationCap,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning and development journey.",
    href: "/progress",
    icon: LineChart,
  },
  {
    title: "Community Forum",
    description: "Connect with others and share information.",
    href: "/forum",
    icon: MessagesSquare,
  },
  {
    title: "Analytics Reporting",
    description: "View platform usage and impact analytics.",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Chat Assistant",
    description: "Ask questions and get help from our AI assistant.",
    href: "/chat",
    icon: Mic,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome to Digital सखी
        </h1>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <p className="text-muted-foreground">
        Your central hub for digital services, learning, and community connection.
      </p>
      <div className="grid gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.href} className="group">
            <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium font-headline">
                  {feature.title}
                </CardTitle>
                <feature.icon className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
                <div className="flex items-center pt-4 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Go to {feature.title} <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
