# Steve's Pool Room

A mobile-friendly Next.js pool tracker backed permanently by Supabase. Public visitors can view standings, play days, games, current-session results, and head-to-head rivalries. Only approved administrators can change records.

## Local setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Set these values locally (they are already configured in Vercel):

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

The publishable key is intentionally available to the browser. Security comes from the configured Supabase Row Level Security policies, not from hiding this key.

## Administrator setup

1. In Supabase Authentication, enable **Email** authentication and create the administrator with an email and password.
2. Sign in from **Admin sign in** with that email and password.
3. Add that user's UUID to `admin_users.user_id` in the Supabase table editor.
4. Sign out and sign in again. Editing controls appear only when the authenticated user's UUID is present in `admin_users`.

Anonymous users retain read-only access. The application also relies on RLS to reject writes from anyone who is not an administrator.

## Browser-data migration

An administrator can open **Data → One-time browser migration**. The tool detects `steves-pool-room-v1`, previews its player/play-day/game counts, and imports each record while rebuilding stable UUID relationships. A successful import is marked in that browser to prevent an accidental repeat. The original local-storage value is deliberately retained until the administrator compares the cloud records with the preview and confirms they are correct.

If an import fails, the report shows the Supabase error and the source remains untouched. Before retrying a partially completed migration, inspect and remove only the newly inserted cloud records; otherwise a retry can duplicate the completed portion.

## Backups and recovery

* **Export JSON** downloads the complete currently visible cloud data and relationships.
* **Export CSV** downloads one row per active game for spreadsheets.
* An administrator can select an exported JSON file to validate it and import it into Supabase.
* Supabase database backups remain the authoritative disaster-recovery mechanism. Configure point-in-time recovery or scheduled backups in Supabase for production records.
* Players with history are archived via `is_active`; games and play days are retained with `deleted_at`. Do not physically delete those rows during routine cleanup.

## Production checks

```bash
npm run lint
npm run build
npm start
```
