import { createClient } from '@/utils/supabase/server';
import Bar from './bar';

export default async function Header() {
    const supabase = createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    return (
        <nav>
            <div className="z-50 bg-white flex items-center p-2 lg:px-5 shadow-md w-full">
                <Bar user={user} />
            </div>
        </nav>
    );
}
