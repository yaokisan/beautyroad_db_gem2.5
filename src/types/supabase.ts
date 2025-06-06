export type Database = {
  public: {
    Tables: {
      projects: {
        Insert: {
          id?: string
          title: string
          shoot_date?: string | null
          shoot_time_total?: string | null
          location_name?: string | null
          location_url?: string | null
          note?: string | null
        }
        Row: Record<string, unknown>
        Update: Record<string, unknown>
      }
    }
  }
}

export {}
