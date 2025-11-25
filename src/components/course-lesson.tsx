'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface Lesson {
  videoId: string;
  title: string;
  summary: string;
}

interface CourseLessonProps {
  lesson: Lesson;
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
      <CardContent className="space-y-4">
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
