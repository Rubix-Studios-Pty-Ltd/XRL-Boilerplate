'use client';

import { Button } from '@/components/ui/button';
import { signInWithOAuth } from '@/utils/auth-helpers/client';
import { type Provider } from '@supabase/supabase-js';
import { SiFacebook, SiGoogle, SiGithub } from '@icons-pack/react-simple-icons';
import { useState } from 'react';

type OAuthProviders = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

export default function OauthSignIn() {
  const oAuthProviders: OAuthProviders[] = [
    { name: 'facebook',
      displayName: 'Facebook',
      icon: <SiFacebook className="h-5 w-5" />
    },
    { name: 'google',
      displayName: 'Google',
      icon: <SiGoogle className="h-5 w-5" />
    },
    /* Add desired OAuth providers here */
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await signInWithOAuth(e);
    setIsSubmitting(false);
  };

  return (
    <div className="mt-3">
      {oAuthProviders.map((provider) => (
        <form
          key={provider.name}
          className="pb-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input type="hidden" name="provider" value={provider.name} />
          <Button
            type="submit"
            className="w-full"
          >
            <span className="mr-2">{provider.icon}</span>
            <span>{provider.displayName}</span>
          </Button>
        </form>
      ))}
    </div>
  );
}
