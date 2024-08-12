'use client';

import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card';
import { handleRequest } from '@/utils/auth-helpers/client';
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { updateName } from '@/utils/auth-helpers/server';
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"

export default function NameForm({ userName }: { userName: string }) {
  const router = useRouter();
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);

    if (e.currentTarget.fullName.value === userName) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    handleRequest(e, updateName, router);
    setIsSubmitting(false);
  };

  return (
    <Card
      title="Your Name"
      description="Please enter your full name."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">{/*Text Field Here*/}</p>
          <Button
            type="submit"
            form="nameForm"
            className="min-w-32"
            disabled={isSubmitting}
          >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Update Name'
          )}
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
      <Form {...form}>
        <form id="nameForm" onSubmit={(e) => onSubmit(e)}>
        <FormField
            name="fullName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    id="fullName"
                    type="text"
                    className="focus-visible:ring-0"
                    autoCapitalize="true"
                    autoComplete="name"
                    autoCorrect="off"
                    defaultValue={userName ?? ''}
                    placeholder="" {...field} 
                    onChange={(e) => {
                      let filteredValue = e.target.value
                        .replace(/[^A-Za-z\s']/g, '')
                        .replace(/\s\s+/g, ' ')
                    
                      if (filteredValue.length > 64) {
                        filteredValue = filteredValue.substring(0, 64);
                      }
                    
                      if (filteredValue.length > 0) {
                        const capitalizeWords = (str: string): string => {
                          return str
                            .toLowerCase()
                            .replace(/\b\w/g, (char: string) => char.toUpperCase());
                        };
                    
                        field.onChange(capitalizeWords(filteredValue));
                      }
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
