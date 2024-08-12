'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '@/components/static/logo';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import { handleRequest } from '@/utils/auth-helpers/client';
import { SignOut } from '@/utils/auth-helpers/server';
import { usePathname, useRouter } from 'next/navigation';

interface NavlinksProps {
  user?: any;
}

export default function Bar({ user }: NavlinksProps) {
  const pathname = usePathname();
  const router = useRouter();
  const Login = () => window.location.href = "/signin"

  const clientRouter = getRedirectMethod() === 'client';

  const handleSignOut = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRequest(e, SignOut, clientRouter ? router : null);
  };

  return (
    <div className="w-full flex flex-item-center py-2">
      <div className="w-32 flex items-center space-x-2">
        <Link href="/" aria-label="Logo">
          <Logo />
        </Link>
        <Link href="/">
          <h1 className="font-bold">XRL</h1>
        </Link>
      </div>
      <div className="flex flex-grow items-center justify-center">
        <nav className="space-x-5 lg:block text-sm font-bold">
          <Link href="/">
            Home
          </Link>
          {user && (
            <Link href="/account">
              Account
            </Link>
          )}
        </nav>
      </div>
      <div className="w-32 flex items-center justify-end space-x-2">
        {user ? (
          <form onSubmit={handleSignOut}>
            <input type="hidden" name="pathName" value={pathname} />
            <Button type="submit">
              Sign out
            </Button>
          </form>
        ) : (
          <Button onClick={Login}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
}
