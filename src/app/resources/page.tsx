import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Resource } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SidebarTrigger } from "@/components/ui/sidebar";

const resourcesData: Resource[] = [
  {
    id: "resource-computer-basics",
    title: "Computer Basics 101",
    description: "Learn how to use a computer, from turning it on to navigating the desktop.",
    type: "Video",
    image: PlaceHolderImages.find(img => img.id === 'resource-computer-basics')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(img => img.id === 'resource-computer-basics')?.imageHint || '',
    youtubeLink: "https://www.youtube.com/results?search_query=computer+basics+tutorial",
  },
  {
    id: "resource-internet-safety",
    title: "Staying Safe Online",
    description: "A comprehensive guide to protecting your personal information on the internet.",
    type: "Guide",
    image: PlaceHolderImages.find(img => img.id === 'resource-internet-safety')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(img => img.id === 'resource-internet-safety')?.imageHint || '',
    youtubeLink: "https://www.youtube.com/results?search_query=internet+safety+guide",
  },
  {
    id: "resource-digital-payments",
    title: "Intro to Digital Payments",
    description: "Discover how to use your phone for secure and easy payments.",
    type: "Video",
    image: PlaceHolderImages.find(img => img.id === 'resource-digital-payments')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(img => img.id === 'resource-digital-payments')?.imageHint || '',
    youtubeLink: "https://www.youtube.com/results?search_query=digital+payments+tutorial",
  },
  {
    id: "resource-online-services",
    title: "Accessing Government Services",
    description: "An article explaining how to apply for services and schemes online.",
    type: "Article",
    image: PlaceHolderImages.find(img => img.id === 'resource-online-services')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(img => img.id === 'resource-online-services')?.imageHint || '',
    youtubeLink: "https://www.youtube.com/results?search_query=how+to+access+government+services+online",
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Digital Literacy Resources</h1>
         <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <p className="text-muted-foreground">
        Browse our collection of tutorials and guides to enhance your digital skills.
      </p>
      <div className="grid gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {resourcesData.map((resource) => (
          <Link key={resource.id} href={resource.youtubeLink} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
              <CardHeader className="p-0">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  width={600}
                  height={400}
                  className="w-full h-40 object-cover"
                  data-ai-hint={resource.imageHint}
                />
              </CardHeader>
              <CardContent className="p-4">
                <Badge variant="secondary" className="mb-2">{resource.type}</Badge>
                <h3 className="text-lg font-semibold mb-1 font-headline">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
