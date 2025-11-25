'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from 'next/link';
import { allCourses } from "@/lib/courses";
import { ArrowRight } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Digital Literacy Courses</h1>
         <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <p className="text-muted-foreground">
        Improve your skills by taking our interactive video courses.
      </p>
      
      <div className="grid gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3">
        {allCourses.map((course) => (
          <Card key={course.slug} className="flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <course.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-headline">{course.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{course.description}</p>
            </CardContent>
            <CardFooter>
                <Link href={`/resources/${course.slug}`} className="w-full">
                    <Button className="w-full">
                        Start Course <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

    </div>
  );
}
