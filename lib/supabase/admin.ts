// lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,  // ← Use service role, not anon key
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function matchRules(queryEmbedding: number[], hoaId: string) {
  console.log("matchRules called with queryEmbedding:", queryEmbedding.slice(-5), "hoaId:", hoaId);
  console.log("Executing RPC function 'match_rules' with parameters:")
  const { data, error } = await supabaseAdmin.rpc("match_rules", {
    query_embedding: queryEmbedding,
    match_threshold: 0.4,    // Add your defaults
    match_count: 5,
    filter_hoa_id: hoaId,
  });
  console.log("matchRules data:", data);
  if (error) throw error;
  return data;
}