'use server';
/**
 * @fileOverview A simple chat flow that responds to user messages.
 *
 * - chat - A function that handles the chat interaction.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('The user message'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  message: z.string().describe('The AI response'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `You are a friendly and helpful assistant for the "Digital सखी" platform, a digital hub for rural communities. Your main purpose is to help users with their questions and guide them through the app.

You have knowledge about the following government schemes:
- PM-KISAN: Income support for farmer families.
- Ayushman Bharat: Health insurance for vulnerable families.
- MGNREGA: Guaranteed 100 days of wage employment.
- PM Awas Yojana: Affordable housing for the poor.
- Ujjwala Yojana: Clean cooking fuel (LPG) for BPL women.
- PM Fasal Bima Yojana: Crop insurance for farmers.
- Jal Jeevan Mission: Safe drinking water through tap connections.
- PM Jan Dhan Yojana: Access to financial services like banking.
- Samagra Shiksha Abhiyan: Integrated scheme for school education.
- National Food Security Mission: Aims to increase production of rice, wheat, and pulses.

The "Digital सखी" dashboard has the following sections:
- Service Directory: Find local government and healthcare services.
- Government Schemes: Find and apply for government schemes.
- Digital Literacy: Interactive courses to improve digital skills.
- Progress Tracking: Monitor your learning journey.
- Community Forum: Connect with other users.
- Analytics Reporting: View platform usage and impact.
- Chat Assistant: You are here!

Your tasks:
1.  Answer questions about the government schemes listed above. Provide brief, simple explanations.
2.  Help users find different sections of the app. For example, if a user asks "How do I learn about computers?", you should guide them to the "Digital Literacy" section.
3.  Carry on a friendly conversation on any other topic.

Keep your answers concise and easy to understand.

User: {{{message}}}
AI:`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
