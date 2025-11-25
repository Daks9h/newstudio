'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating regional insights to customize content based on real-world trends or user activity within specific locales.
 *
 * - generateRegionalInsights - A function that generates regional insights based on input data.
 * - RegionalInsightsInput - The input type for the generateRegionalInsights function.
 * - RegionalInsightsOutput - The return type for the generateRegionalInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RegionalInsightsInputSchema = z.object({
  locale: z.string().describe('The specific locale for which insights are requested (e.g., city, region).'),
  trendData: z
    .string()
    .describe('The latest real-world trends or news relevant to the locale.'),
  activityData: z
    .string()
    .describe('The activity levels and search patterns within the specified locale.'),
});
export type RegionalInsightsInput = z.infer<typeof RegionalInsightsInputSchema>;

const RegionalInsightsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of suggestions for customizing content based on the provided data.'),
});
export type RegionalInsightsOutput = z.infer<typeof RegionalInsightsOutputSchema>;

export async function generateRegionalInsights(input: RegionalInsightsInput): Promise<RegionalInsightsOutput> {
  return generateRegionalInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'regionalInsightsPrompt',
  input: {schema: RegionalInsightsInputSchema},
  output: {schema: RegionalInsightsOutputSchema},
  prompt: `You are an expert in regional content customization.

  Based on the locale, trend data, and user activity data provided, generate a list of suggestions for customizing content within a digital hub to better serve the users of that hub.

  Locale: {{{locale}}}
  Trend Data: {{{trendData}}}
  Activity Data: {{{activityData}}}

  Suggestions should be specific and actionable, focusing on how to make the content more relevant and useful for users in the specified locale.

  Format your output as a numbered list of suggestions.
  `,
});

const generateRegionalInsightsFlow = ai.defineFlow(
  {
    name: 'generateRegionalInsightsFlow',
    inputSchema: RegionalInsightsInputSchema,
    outputSchema: RegionalInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
