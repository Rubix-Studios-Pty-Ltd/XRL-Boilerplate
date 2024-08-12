import Image from 'next/image';

export default function Logo() {
    return (
        <Image
            src="/logo.svg"
            height={60}
            width={60}
            alt="XRL Logo"
            priority={true}
        />
    );
}
