
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Info } from 'lucide-react';
import type { CourseLesson } from '@/lib/types';

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
        <div className="aspect-video">
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${lesson.videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-muted-foreground">{lesson.summary}</p>
        
        {lesson.steps && lesson.steps.length > 0 && (
          <div className="pt-4">
            <h3 className="font-semibold text-lg mb-3">Step-by-Step Guide</h3>
            <div className="relative pl-6">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border"></div>
                <ol className="space-y-4">
                    {lesson.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold z-10">
                                {index + 1}
                            </div>
                            <p className="text-sm text-muted-foreground -mt-1">{step}</p>
                        </li>
                    ))}
                </ol>
            </div>
          </div>
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
