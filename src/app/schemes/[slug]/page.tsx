
'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { allSchemeDetails } from '@/lib/scheme-details';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, FileText } from 'lucide-react';

export default function SchemeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const scheme = allSchemeDetails.find((s) => s.slug === slug);

  if (!scheme) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
       <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Go back</span>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight font-headline">{scheme.name}</h1>
      </div>

      <Card>
        <CardHeader className="flex-row items-start gap-6 space-y-0">
          <div className="p-4 bg-primary/10 rounded-full">
            <scheme.icon className="h-10 w-10 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-headline mb-1">{scheme.name}</CardTitle>
            <CardDescription>{scheme.longDescription}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
            {/* Eligibility Criteria */}
            <div>
                <h2 className="text-xl font-semibold mb-3 font-headline">Who can apply? (Eligibility)</h2>
                <ul className="space-y-2">
                    {scheme.eligibility.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Documents Required */}
             <div>
                <h2 className="text-xl font-semibold mb-3 font-headline">What documents do you need?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {scheme.documents.map((doc, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-3 border rounded-lg bg-secondary/50">
                            <FileText className="h-8 w-8 text-primary mb-2" />
                            <p className="text-xs font-medium">{doc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Application Process */}
            <div>
                <h2 className="text-xl font-semibold mb-3 font-headline">How to apply? (Application Process)</h2>
                <div className="relative pl-6">
                    {/* Vertical line */}
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border"></div>
                    
                    <ol className="space-y-6">
                        {scheme.applicationProcess.map((step, index) => (
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

            {/* Visit Website Button */}
            <div className="text-center pt-4">
                <a href={scheme.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg">
                        Visit Official Website <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </a>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
