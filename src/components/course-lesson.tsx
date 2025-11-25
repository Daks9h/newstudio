
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Info, Video, BookOpen, Star } from 'lucide-react';
import type { CourseLesson } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface CourseLessonProps {
  lesson: CourseLesson;
  lessonNumber: number;
}

export function CourseLesson({ lesson, lessonNumber }: CourseLessonProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleMarkAsComplete = () => {
    setIsCompleted(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Lesson {lessonNumber}: {lesson.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Main Content */}
        <div className="prose prose-sm max-w-none text-foreground/90">
            {lesson.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {/* Infographic */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
             <Image 
                src={lesson.infographicUrl}
                alt={lesson.infographicHint}
                fill
                className="object-cover"
                data-ai-hint={lesson.infographicHint}
             />
        </div>

        {/* Key Points */}
         <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Key Takeaways
            </h3>
            <ul className="space-y-2">
                {lesson.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{point}</span>
                    </li>
                ))}
            </ul>
        </div>
        
        {/* Optional Video */}
        {lesson.videoId && (
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2">
                            <Video className="h-5 w-5" />
                            <span>Watch the Video (Optional)</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="aspect-video mt-4">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src={`https://www.youtube.com/embed/${lesson.videoId}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        )}

        <Button onClick={handleMarkAsComplete} disabled={isCompleted}>
          {isCompleted ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Completed
            </>
          ) : (
            'Mark as Complete'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
