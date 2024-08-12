import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/static/logo';
import { SiGithub } from '@icons-pack/react-simple-icons';

export default function Footer() {
  return (
    <footer className="mx-auto w-full px-6 border-zinc-700 shadow-md">
      <div className="grid grid-cols-1 gap-8 py-12 transition-colors duration-150 border-b lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-2">
          <Link
            href="/"
            className="flex items-center flex-initial space-x-2 font-bold md:mr-24"
          >
              <Logo />
            <span>XRL</span>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col flex-initial text-sm md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="transition duration-150 ease-in-out hover:text-slate-600"
              >
                Home
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="transition duration-150 ease-in-out hover:text-slate-600"
              >
                About
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="transition duration-150 ease-in-out hover:text-slate-600"
              >
                Careers
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className="transition duration-150 ease-in-out hover:text-slate-600"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col flex-initial text-sm md:flex-1">
            <li className="py-3 md:py-0 md:pb-4">
              <p className="font-bold transition duration-150 ease-in-out">
                LEGAL
              </p>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className=" transition duration-150 ease-in-out hover:text-slate-600"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="py-3 md:py-0 md:pb-4">
              <Link
                href="/"
                className=" transition duration-150 ease-in-out hover:text-slate-600"
              >
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-start col-span-1 lg:col-span-6 lg:justify-end">
          <div className="flex items-center h-10 space-x-6">
            <a
              aria-label="Github Repository"
              href="https://github.com/vercel/nextjs-subscription-payments"
            >
              <SiGithub className="h-10 w-10" />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center align-middle justify-between font-semibold text-xs md:flex-row">
        <div>
          <span>
            &copy; {new Date().getFullYear()} XRL. All Rights Reserved.
          </span>
        </div>
        <div className="flex align-middle items-center">
          <span>Crafted By</span>
          <a href="https://xrl.au" aria-label="xrl.au Link">
            <Image
              src="/logo.svg"
              alt="XRL Logo"
              width="50"
              height="50"
              className="inline-block h-20 ml-4 text-white"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
