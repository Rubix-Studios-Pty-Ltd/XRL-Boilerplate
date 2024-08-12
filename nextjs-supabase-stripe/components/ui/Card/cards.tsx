import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-4xl m-auto border rounded-md p border-zinc-700">
      <div className="px-8 py-8">
        <h3 className="mb-1 text-2xl font-bold">{title}</h3>
        <p>{description}</p>
        {children}
      </div>
      {footer && (
        <div className="p-4 border-t rounded-b-md border-zinc-700">
          {footer}
        </div>
      )}
    </div>
  );
}
