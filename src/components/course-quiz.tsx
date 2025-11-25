'use client';

import React, { useState } from 'react';
import { useAuth, useFirebase } from '@/firebase/provider';
import { saveCourseProgress } from '@/firebase/firestore/mutations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';
import type { QuizQuestion } from '@/lib/types';

interface CourseQuizProps {
  questions: QuizQuestion[];
  courseName: string;
}

export function CourseQuiz({ questions, courseName }: CourseQuizProps) {
  const { user } = useAuth();
  const { firestore } = useFirebase();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers({
      ...answers,
      [questionIndex]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        calculatedScore++;
      }
    });
    
    const finalScore = (calculatedScore / questions.length) * 100;
    setScore(finalScore);
    setSubmitted(true);

    if (user && firestore) {
      saveCourseProgress(firestore, user.uid, courseName, finalScore);
    }
  };

  if (submitted) {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">Your final score is:</p>
          <p className="text-4xl font-bold text-primary">{score.toFixed(0)}%</p>
          <Badge className="text-lg py-2 px-4">
            <Award className="mr-2 h-5 w-5" />
            Course Completed
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Test Your Knowledge</CardTitle>
        <CardDescription>Answer the questions below to complete the course.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-8">
          {questions.map((q, index) => (
            <div key={index} className="space-y-4">
              <p className="font-semibold">{index + 1}. {q.question}</p>
              <RadioGroup onValueChange={(value) => handleAnswerChange(index, value)}>
                <div className="space-y-2">
                  {q.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`q${index}-o${optionIndex}`} />
                      <Label htmlFor={`q${index}-o${optionIndex}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit Quiz</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
