'use client';

import { Button } from '@/components/ui/button';
import { handleRequest } from '@/utils/auth-helpers/client';
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { Loader2 } from "lucide-react"
import { signInWithEmail } from '@/utils/auth-helpers/server';
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

interface EmailSignInProps {
  allowPassword: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function EmailSignIn({
  redirectMethod,
  disableButton
}: EmailSignInProps) {
  const router = useRouter();
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const nextRouter = redirectMethod === 'client' ? router : null;
    await handleRequest(e, signInWithEmail, nextRouter);

    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="my-3">
      <Form {...form}>
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="grid gap-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    id="email"
                    type="email"
                    className="focus-visible:ring-0"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    placeholder="" {...field} 
                    onChange={(e) => {
                      field.onChange(e.target.value.toLowerCase());
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-1"
            disabled={isSubmitting || disableButton}
          >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Send email'
          )}
          </Button>
        </div>
      </form>
      </Form>
      <div>
        <div className="my-1">
          <Link href="/signin/password_signin" className="text-xs font-bold">
            Sign in with email and password
          </Link>
        </div>
      </div>
    </div>
  );
}
