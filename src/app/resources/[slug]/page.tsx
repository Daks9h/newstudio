'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { CourseLesson } from '@/components/course-lesson';
import { CourseQuiz } from '@/components/course-quiz';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { allCourses } from '@/lib/courses';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';


export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const course = allCourses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Go back</span>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight font-headline">{course.title}</h1>
        </div>
         <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
      <p className="text-muted-foreground">
        {course.description}
      </p>
      
      <div className="space-y-8 mt-6">
        {course.lessons.map((lesson, index) => (
          <CourseLesson key={index} lesson={lesson} lessonNumber={index + 1} />
        ))}
      </div>

      <div className="mt-12">
        <CourseQuiz questions={course.quiz} courseName={course.title} />
      </div>
    </div>
  );
}
