import {createClient} from '@/lib/supabase/server';




export  default async  function TestPage() {
    const supabase = await createClient();

            const { data, error } = await supabase.from('rules').select('*');

            if (error) {
                console.error('Error fetching rules:', error);
            } else {
                console.table(data);
            }

    return <div>Check console for rules output</div>;
}