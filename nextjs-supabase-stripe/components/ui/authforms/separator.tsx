interface SeparatorProps {
  text: string;
}

export default function Separator({ text }: SeparatorProps) {
  return (
    <div className="relative">
      <div className="relative flex items-center">
        <div className="grow border-t border-zinc-700"></div>
        <span className="mx-3 shrink text-xs font-bold leading-8">
          {text}
        </span>
        <div className="grow border-t border-zinc-700"></div>
      </div>
    </div>
  );
}
