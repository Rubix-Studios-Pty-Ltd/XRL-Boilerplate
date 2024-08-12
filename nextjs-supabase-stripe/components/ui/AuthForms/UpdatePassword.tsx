'use client';

import { Button } from '@/components/ui/button';
import { handleRequest } from '@/utils/auth-helpers/client';
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { updatePassword } from '@/utils/auth-helpers/server';
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

interface UpdatePasswordProps {
  redirectMethod: string;
}

export default function UpdatePassword({
  redirectMethod
}: UpdatePasswordProps) {
  const router = useRouter();
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const nextRouter = redirectMethod === 'client' ? router : null;
    await handleRequest(e, updatePassword, nextRouter);

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
                      autoComplete="off"
                      placeholder="" {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="passwordConfirm"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input 
                      id="passwordConfirm"
                      type="password"
                      className="focus-visible:ring-0"
                      autoComplete="off"
                      placeholder="" {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          <Button
            type="submit"
            className="mt-1"
            disabled={isSubmitting}
          >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Update Password'
              )}
          </Button>
        </div>
      </form>
      </Form>
    </div>
  );
}
