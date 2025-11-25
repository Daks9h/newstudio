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
} from '@/components/ui/sidebar';
import {
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  MessagesSquare,
  LogOut,
  LogIn,
  Mic,
  FileText,
  User,
} from 'lucide-react';
import { useAuth } from '@/firebase/provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme-toggle';
import { Logo } from '../logo';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/services', label: 'Service Directory', icon: BookOpenCheck },
  { href: '/schemes', label: 'Government Schemes', icon: FileText },
  { href: '/resources', label: 'Digital Literacy', icon: GraduationCap },
  { href: '/progress', label: 'Progress Tracking', icon: LineChart },
  { href: '/forum', label: 'Community Forum', icon: MessagesSquare },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/regional-insights', label: 'Regional Insights', icon: BrainCircuit },
  { href: '/chat', label: 'Chat Assistant', icon: Mic },
];

function UserMenu() {
  const { user, logout } = useAuth();
  if (!user) {
    return (
      <Button asChild variant="ghost" size="sm">
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.photoURL ?? undefined}
              alt={user.displayName ?? 'User'}
            />
            <AvatarFallback>
              {user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.displayName ?? 'User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader className="items-center justify-between p-4 group-data-[collapsible=icon]:justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-lg font-bold font-headline group-data-[collapsible=icon]:hidden">
              Digital सखी
            </span>
          </Link>
          <div className="group-data-[collapsible=icon]:hidden flex items-center gap-2">
            <ThemeToggle />
            <UserMenu />
          </div>
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
