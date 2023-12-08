"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
import { Session } from 'next-auth';

export const AuthButton = async ({ session }: { session: Session | null }) => {

  const { push } = useRouter();

  return (
    
            <Button onClick={() => push(session ? "/api/auth/signout" : "/api/auth/signin")}>
              {session ? "Sign out" : "Sign in"}
            </Button>
          
  )
}
