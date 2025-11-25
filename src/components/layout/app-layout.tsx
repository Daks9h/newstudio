
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  GraduationCap,
  LayoutDashboard,
  Leaf,
  LineChart,
  MessagesSquare,
} from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/services', label: 'Service Directory', icon: BookOpenCheck },
  { href: '/resources', label: 'Digital Literacy', icon: GraduationCap },
  { href: '/progress', label: 'Progress Tracking', icon: LineChart },
  { href: '/forum', label: 'Community Forum', icon: MessagesSquare },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/regional-insights', label: 'Regional Insights', icon: BrainCircuit },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader className="items-center justify-center p-4 group-data-[collapsible=icon]:justify-center">
            <Link href="/" className="flex items-center gap-2">
                <Leaf className="w-8 h-8 text-primary" />
                <span className="text-lg font-bold font-headline group-data-[collapsible=icon]:hidden">
                    Digital सखी
                </span>
            </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={{
                      children: item.label,
                      className: 'font-body',
                    }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
