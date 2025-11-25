'use client';

import 'regenerator-runtime/runtime';
import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, Send, Languages, Bot, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { chat } from '@/ai/flows/chat-flow';
import type { ChatMessage } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en-US');
  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    resetTranscript();

    const aiResponse = await chat({ message: input });
    const aiMessage: ChatMessage = { role: 'assistant', content: aiResponse.message };
    setMessages((prev) => [...prev, aiMessage]);
  };
  
  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language });
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Card className="h-[70vh] flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg px-4 py-2 text-sm max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.content}
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {listening && (
            <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-2 text-sm bg-muted italic">
                    {input || "Listening..."}
                </div>
            </div>
           )}
        </div>
      </ScrollArea>
      <CardContent className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-auto">
              <Languages className="h-4 w-4" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">English</SelectItem>
              <SelectItem value="hi-IN">हिन्दी</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message or use the mic..."
            className="flex-1"
          />
          <Button
            type="button"
            size="icon"
            variant={listening ? 'destructive' : 'outline'}
            onClick={handleMicClick}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
