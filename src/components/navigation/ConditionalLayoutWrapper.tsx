"use client";

import { usePathname } from "next/navigation";

interface ConditionalLayoutWrapperProps {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
  chatLauncher: React.ReactNode;
}

export function ConditionalLayoutWrapper({
  children,
  navbar,
  footer,
  chatLauncher,
}: ConditionalLayoutWrapperProps) {
  const pathname = usePathname();
  
  // Hide navbar, footer, and chat launcher on the get-a-quote flow
  const isStandalonePage = pathname === "/get-a-quote";

  if (isStandalonePage) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      {children}
      {footer}
      {chatLauncher}
    </>
  );
}
