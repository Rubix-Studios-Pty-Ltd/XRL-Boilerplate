'use client';

import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card';
import { handleRequest } from '@/utils/auth-helpers/client';
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { updateEmail } from '@/utils/auth-helpers/server';
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"

export default function EmailForm({
  userEmail
}: {
  userEmail: string | undefined;
}) {
  const router = useRouter();
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);

    if (e.currentTarget.newEmail.value === userEmail) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    handleRequest(e, updateEmail, router);
    setIsSubmitting(false);
  };

  return (
    <Card
      title="Your Email"
      description="Please enter the email address you want to use to login."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">
            We will email you to verify the change.
          </p>
          <Button
            type="submit"
            form="emailForm"
            className="min-w-32"
            disabled={isSubmitting}
          >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Update Email'
          )}
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
      <Form {...form}>
        <form id="emailForm" onSubmit={(e) => onSubmit(e)}>
        <FormField
            name="newEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    id="email"
                    type="email"
                    className="focus-visible:ring-0"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    defaultValue={userEmail ?? ''}
                    placeholder="" {...field} 
                    onChange={(e) => {
                      field.onChange(e.target.value.toLowerCase());
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
        </Form>
      </div>
    </Card>
  );
}
