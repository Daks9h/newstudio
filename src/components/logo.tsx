import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("fill-current", className)}
    >
      <g transform="translate(0, -2)">
        {/* Phone Body */}
        <rect x="25" y="20" width="50" height="70" rx="10" ry="10" className="text-primary" fill="currentColor" />
        <rect x="28" y="23" width="44" height="58" rx="5" ry="5" fill="white" />

        {/* Plant */}
        <path d="M50 75 C 52 70, 52 65, 50 60 L 50 45" strokeWidth="2" stroke="hsl(var(--primary))" fill="none" />
        <path d="M50 55 C 55 52, 60 55, 60 60" strokeWidth="2" stroke="hsl(var(--primary))" fill="none" />
        <path d="M50 55 C 45 52, 40 55, 40 60" strokeWidth="2" stroke="hsl(var(--primary))" fill="none" />
        <path d="M50 65 C 58 62, 65 65, 65 70" strokeWidth="2" stroke="hsl(var(--primary))" fill="none" />
        <path d="M50 65 C 42 62, 35 65, 35 70" strokeWidth="2" stroke="hsl(var(--primary))" fill="none" />

        {/* Hills */}
        <path d="M28 81 C 35 75, 45 75, 50 81" strokeWidth="1.5" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.1)" />
        <path d="M50 81 C 55 75, 65 75, 72 81" strokeWidth="1.5" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.1)" />
        
        {/* House */}
        <path d="M20 85 h 8 v 6 h -8 z" fill="hsl(var(--primary))" />
        <path d="M19 85 L 24 80 L 29 85 Z" fill="hsl(var(--primary))" />

        {/* Wifi Signal */}
        <path d="M40 18 A 20 20 0 0 1 60 18" strokeWidth="2.5" stroke="hsl(var(--primary))" fill="none" />
        <path d="M35 15 A 25 25 0 0 1 65 15" strokeWidth="2.5" stroke="hsl(var(--primary))" fill="none" />
        <path d="M30 12 A 30 30 0 0 1 70 12" strokeWidth="2.5" stroke="hsl(var(--primary))" fill="none" />
      </g>
    </svg>
);
