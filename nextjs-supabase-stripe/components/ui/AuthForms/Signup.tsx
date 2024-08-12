'use client';

import { Button } from '@/components/ui/button';
import { handleRequest } from '@/utils/auth-helpers/client';
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { Loader2 } from "lucide-react"
import { signUp } from '@/utils/auth-helpers/server';
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

// Define prop type with allowEmail boolean
interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = useRouter();
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const nextRouter = redirectMethod === 'client' ? router : null;
    await handleRequest(e, signUp, nextRouter);

    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="my-3">
      <div className="text-xs mb-3">
        <Link href="/signin/password_signin">
          <strong>Have an account?</strong> Sign in
        </Link>
      </div>
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
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      id="password"
                      type="password"
                      className="focus-visible:ring-0"
                      autoComplete="password"
                      placeholder="" {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </div>
        </form>
      </Form>
      {allowEmail && (
        <div>
          <div className="my-1">
            <Link href="/signin/email_signin" className="font-bold text-xs">
              Sign in via magic link
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
