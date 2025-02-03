import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { auth } from '../(auth)/auth';
import Script from 'next/script';

export const experimental_ppr = true;

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use mock user data
  const user = {
    id: 'mock-user-id',
    email: 'demo@example.com',
    name: 'Demo User'
  };

  return (
    <div className="relative flex h-[100dvh]">
      <AppSidebar user={user} />
      {children}
    </div>
  );
}
