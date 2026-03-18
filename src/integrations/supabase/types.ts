export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      followers: {
        Row: {
          created_at: string
          follower_id: string
          id: string
          pundit_id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          id?: string
          pundit_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          id?: string
          pundit_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string
          id: string
          location: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pundit_applications: {
        Row: {
          created_at: string
          experience: string
          id: string
          reviewed_by: string | null
          sport: string
          status: Database["public"]["Enums"]["pundit_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          experience: string
          id?: string
          reviewed_by?: string | null
          sport: string
          status?: Database["public"]["Enums"]["pundit_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          experience?: string
          id?: string
          reviewed_by?: string | null
          sport?: string
          status?: Database["public"]["Enums"]["pundit_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pundit_profiles: {
        Row: {
          avg_odds: number | null
          created_at: string
          id: string
          losses: number | null
          roi: number | null
          sport: string
          total_slips: number | null
          updated_at: string
          user_id: string
          verified: boolean
          voids: number | null
          win_rate: number | null
          wins: number | null
        }
        Insert: {
          avg_odds?: number | null
          created_at?: string
          id?: string
          losses?: number | null
          roi?: number | null
          sport?: string
          total_slips?: number | null
          updated_at?: string
          user_id: string
          verified?: boolean
          voids?: number | null
          win_rate?: number | null
          wins?: number | null
        }
        Update: {
          avg_odds?: number | null
          created_at?: string
          id?: string
          losses?: number | null
          roi?: number | null
          sport?: string
          total_slips?: number | null
          updated_at?: string
          user_id?: string
          verified?: boolean
          voids?: number | null
          win_rate?: number | null
          wins?: number | null
        }
        Relationships: []
      }
      purchases: {
        Row: {
          amount: number
          created_at: string
          id: string
          slip_id: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          slip_id: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          slip_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_slip_id_fkey"
            columns: ["slip_id"]
            isOneToOne: false
            referencedRelation: "slips"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          pundit_id: string
          rating: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          pundit_id: string
          rating: number
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          pundit_id?: string
          rating?: number
          user_id?: string
        }
        Relationships: []
      }
      slips: {
        Row: {
          betslip_code: string | null
          betslip_image_url: string | null
          bookmaker: string
          confidence: Database["public"]["Enums"]["slip_confidence"]
          created_at: string
          expires_at: string | null
          id: string
          league: string
          market: string
          match_name: string
          odds: number
          prediction: string | null
          price: number
          pundit_id: string
          risk: Database["public"]["Enums"]["slip_risk"]
          sport: string
          status: Database["public"]["Enums"]["slip_status"]
          title: string
          updated_at: string
        }
        Insert: {
          betslip_code?: string | null
          betslip_image_url?: string | null
          bookmaker?: string
          confidence?: Database["public"]["Enums"]["slip_confidence"]
          created_at?: string
          expires_at?: string | null
          id?: string
          league: string
          market: string
          match_name: string
          odds: number
          prediction?: string | null
          price?: number
          pundit_id: string
          risk?: Database["public"]["Enums"]["slip_risk"]
          sport: string
          status?: Database["public"]["Enums"]["slip_status"]
          title: string
          updated_at?: string
        }
        Update: {
          betslip_code?: string | null
          betslip_image_url?: string | null
          bookmaker?: string
          confidence?: Database["public"]["Enums"]["slip_confidence"]
          created_at?: string
          expires_at?: string | null
          id?: string
          league?: string
          market?: string
          match_name?: string
          odds?: number
          prediction?: string | null
          price?: number
          pundit_id?: string
          risk?: Database["public"]["Enums"]["slip_risk"]
          sport?: string
          status?: Database["public"]["Enums"]["slip_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          reference: string | null
          status: Database["public"]["Enums"]["tx_status"]
          type: Database["public"]["Enums"]["tx_type"]
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          reference?: string | null
          status?: Database["public"]["Enums"]["tx_status"]
          type: Database["public"]["Enums"]["tx_type"]
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          reference?: string | null
          status?: Database["public"]["Enums"]["tx_status"]
          type?: Database["public"]["Enums"]["tx_type"]
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          balance: number
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "customer" | "pundit" | "admin"
      payment_method:
        | "mpesa"
        | "tigo_pesa"
        | "airtel_money"
        | "bank_transfer"
        | "wallet"
      pundit_status: "pending" | "approved" | "rejected"
      slip_confidence: "low" | "medium" | "high"
      slip_risk: "low" | "medium" | "high"
      slip_status: "pending" | "won" | "lost" | "void" | "expired"
      tx_status: "pending" | "completed" | "failed"
      tx_type: "deposit" | "withdrawal" | "purchase" | "earning" | "refund"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["customer", "pundit", "admin"],
      payment_method: [
        "mpesa",
        "tigo_pesa",
        "airtel_money",
        "bank_transfer",
        "wallet",
      ],
      pundit_status: ["pending", "approved", "rejected"],
      slip_confidence: ["low", "medium", "high"],
      slip_risk: ["low", "medium", "high"],
      slip_status: ["pending", "won", "lost", "void", "expired"],
      tx_status: ["pending", "completed", "failed"],
      tx_type: ["deposit", "withdrawal", "purchase", "earning", "refund"],
    },
  },
} as const
