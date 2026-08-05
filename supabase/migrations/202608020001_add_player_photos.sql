-- Issue #6: optional player photos stored in Supabase Storage.
-- This migration is additive: existing players, games, play days, and auth users are untouched.
alter table public.players add column if not exists photo_url text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'player-photos', 'player-photos', true, 5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public profile images are intentionally readable without authentication.
drop policy if exists "Public can view player photos" on storage.objects;
create policy "Public can view player photos"
on storage.objects for select
using (bucket_id = 'player-photos');

-- Match the app's existing admin_users authorization model for all writes.
drop policy if exists "Admins can upload player photos" on storage.objects;
create policy "Admins can upload player photos"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'player-photos'
  and exists (select 1 from public.admin_users where user_id = auth.uid())
);

drop policy if exists "Admins can update player photos" on storage.objects;
create policy "Admins can update player photos"
on storage.objects for update to authenticated
using (
  bucket_id = 'player-photos'
  and exists (select 1 from public.admin_users where user_id = auth.uid())
)
with check (
  bucket_id = 'player-photos'
  and exists (select 1 from public.admin_users where user_id = auth.uid())
);

drop policy if exists "Admins can delete player photos" on storage.objects;
create policy "Admins can delete player photos"
on storage.objects for delete to authenticated
using (
  bucket_id = 'player-photos'
  and exists (select 1 from public.admin_users where user_id = auth.uid())
);
