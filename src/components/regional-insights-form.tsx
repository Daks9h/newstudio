'use client';
import React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleGenerateInsights, type FormState } from '@/app/regional-insights/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Lightbulb } from 'lucide-react';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? 'Generating...' : 'Generate Insights'}
    </Button>
  );
}

export function RegionalInsightsForm() {
  const [state, formAction] = useActionState(handleGenerateInsights, initialState);

  return (
    <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <form action={formAction}>
                <CardHeader>
                    <CardTitle className="font-headline">Generate Regional Insights</CardTitle>
                    <CardDescription>
                        Input local data to receive AI-powered content suggestions.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="locale">Locale</Label>
                        <Input id="locale" name="locale" placeholder="e.g., North District, West Bengal" />
                        {state?.errors?.locale && <p className="text-sm font-medium text-destructive">{state.errors.locale[0]}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="trendData">Trend Data</Label>
                        <Textarea id="trendData" name="trendData" placeholder="e.g., Recent increase in mobile banking adoption, upcoming local festivals..." className="min-h-24" />
                        {state?.errors?.trendData && <p className="text-sm font-medium text-destructive">{state.errors.trendData[0]}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="activityData">Activity Data</Label>
                        <Textarea id="activityData" name="activityData" placeholder="e.g., High search volume for 'government schemes', low engagement with healthcare articles..." className="min-h-24" />
                        {state?.errors?.activityData && <p className="text-sm font-medium text-destructive">{state.errors.activityData[0]}</p>}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                    <SubmitButton />
                    {state?.message && !state.errors && !state.suggestions && (
                         <p className={`text-sm ${state.message.startsWith('Failed') ? 'text-destructive' : 'text-muted-foreground'}`}>{state.message}</p>
                    )}
                </CardFooter>
            </form>
        </Card>
        
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline">Suggestions</h2>
            {state.suggestions && state.suggestions.length > 0 ? (
                <Card className="bg-primary/5">
                    <CardContent className="p-6">
                        <ul className="space-y-4">
                            {state.suggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <Lightbulb className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                                    <span className="text-sm text-foreground/90">{suggestion.replace(/^\d+\.\s*/, '')}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ) : (
                 <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full">
                    <div className="p-3 bg-secondary rounded-full mb-4">
                        <Lightbulb className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Your generated insights will appear here.</p>
                </div>
            )}
        </div>
    </div>
  );
}
