
'use server';

import { generateRegionalInsights } from '@/ai/flows/generate-regional-insights';
import { z } from 'zod';

const FormSchema = z.object({
  locale: z.string().min(1, 'Locale is required.'),
  trendData: z.string().min(10, 'Trend data must be at least 10 characters.'),
  activityData: z.string().min(10, 'Activity data must be at least 10 characters.'),
});

export type FormState = {
  message: string;
  suggestions?: string[];
  errors?: {
    locale?: string[];
    trendData?: string[];
    activityData?: string[];
  };
};

export async function handleGenerateInsights(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    locale: formData.get('locale'),
    trendData: formData.get('trendData'),
    activityData: formData.get('activityData'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to generate insights. Please check the form.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateRegionalInsights(validatedFields.data);
    if (result && result.suggestions) {
       return {
         message: 'Insights generated successfully.',
         suggestions: result.suggestions,
       };
    } else {
        return { message: 'Failed to generate insights. The AI returned an empty response.' };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred while contacting the AI service.',
    };
  }
}
