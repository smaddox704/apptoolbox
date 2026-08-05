import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
}

export const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

export type CloudPlayer = {
  id: string; name: string; nickname: string | null; color: string;
  photo_url: string | null; is_active: boolean; created_at?: string; updated_at?: string;
};
export type CloudGame = {
  id: string; play_day_id: string; game_number: number; player_1_id: string;
  player_2_id: string; winner_id: string; game_type: string; notes: string | null;
  start_time: string | null; series: string | null; created_at?: string; updated_at?: string;
  deleted_at: string | null;
};
export type CloudPlayDay = {
  id: string; date: string; name: string | null; notes: string | null;
  created_at: string; updated_at?: string; deleted_at: string | null;
  play_day_players?: { player_id: string }[]; games?: CloudGame[];
};

export async function loadPoolRoom() {
  const [playersResult, daysResult] = await Promise.all([
    supabase.from("players").select("*").order("name"),
    supabase.from("play_days").select("*, play_day_players(player_id), games(*)")
      .is("deleted_at", null).order("date", { ascending: false }),
  ]);
  if (playersResult.error) throw playersResult.error;
  if (daysResult.error) throw daysResult.error;
  return {
    players: (playersResult.data ?? []) as CloudPlayer[],
    days: (daysResult.data ?? []) as CloudPlayDay[],
  };
}

export async function isAdministrator(userId: string) {
  const { data, error } = await supabase.from("admin_users").select("user_id").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return Boolean(data);
}
