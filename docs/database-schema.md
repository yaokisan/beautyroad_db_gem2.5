# Database Schema Memo (Supabase)

> 最終更新: 2025-06-06

## 既存テーブル

| テーブル | 用途 |
| -------- | ---- |
| `public.profiles` | 認証ユーザーの基本プロフィール (Auth 連携) |

```
columns:
  id          uuid (PK, references auth.users)
  updated_at  timestamptz
  username    text unique (>= 3 chars)
  full_name   text
  avatar_url  text
  website     text
policies:
  • everyone  : SELECT
  • user_only : INSERT / UPDATE (auth.uid() = id)
trigger:
  handle_new_user → 新規ユーザ作成時に自動挿入
```

---

## 撮影管理アプリ用テーブル（2025-06-06 追加）

| テーブル | 主キー | 説明 |
| -------- | ------ | ---- |
| `public.projects`      | `id` | 撮影プロジェクト（収録日単位） |
| `public.cast_members`  | `id` | 出演者名簿（プロジェクト別） |
| `public.scenes`        | `id` | 企画 / シーン情報 |
| `public.scene_casts`   |  `(scene_id, cast_id)` | 企画と出演者の紐付け (多対多) |

### projects
```
columns:
  id                uuid PK
  title             text
  shoot_date        date
  shoot_time_total  interval
  location_name     text
  location_url      text
  note              text
  created_by        uuid → auth.users
  created_at / updated_at timestamptz
```

### cast_members
```
columns:
  id                uuid PK
  project_id        uuid → projects
  name              text
  role_note         text
  call_time         timestamptz (確定)
  wrap_time         timestamptz (確定)
  call_time_tmp     timestamptz (仮)
  wrap_time_tmp     timestamptz (仮)
  user_id           uuid → auth.users (任意)
  created_at / updated_at timestamptz
```

### scenes
```
columns:
  id                uuid PK
  project_id        uuid → projects
  title             text
  start_time / end_time       timestamptz (確定)
  start_time_tmp / end_time_tmp timestamptz (仮)
  script_url        text (台本URL)
  note              text
  created_at / updated_at timestamptz
```

### scene_casts
```
columns:
  scene_id          uuid → scenes
  cast_id           uuid → cast_members
  role              text
  PRIMARY KEY(scene_id, cast_id)
```

---

## Row Level Security (RLS)

1. **デフォルト: すべて非公開** (`enable row level security`)
2. **管理者** (`is_admin` claim = true) → 各テーブル `FOR ALL` FULL ACCESS
3. **出演者本人**
   * 自分の行 (`cast_members`) を SELECT
   * 関連 `scene_casts` / `scenes` を SELECT

ポリシー SQL は `supabase/migrations/202506061200_schema.sql` を参照。

---

## メモ
- 型生成は
  ```bash
  supabase gen types typescript --local > src/types/supabase.ts
  ```
- 将来、出演者を招待してログインさせる場合は `cast_members.user_id` を活用して `profiles` とリンク可能。 