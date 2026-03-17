import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { phone, amount } = await req.json();

    // Validate inputs
    if (!phone || !amount || amount < 500) {
      return new Response(
        JSON.stringify({ error: "Phone and amount (min 500 TZS) are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const phoneClean = phone.replace(/\D/g, "");
    if (!/^255\d{9}$/.test(phoneClean)) {
      return new Response(
        JSON.stringify({ error: "Phone must be in format 255XXXXXXXXX" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("SONIC_PESA_API_KEY")!;

    // Create order via Sonic Pesa
    const sonicRes = await fetch(
      "https://api.sonicpesa.com/api/v1/payment/create_order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify({
          buyer_email: user.email || "customer@kanji.app",
          buyer_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Customer",
          buyer_phone: phoneClean,
          amount: Number(amount),
          currency: "TZS",
        }),
      }
    );

    const sonicData = await sonicRes.json();

    if (sonicData.status !== "success") {
      return new Response(
        JSON.stringify({ error: sonicData.message || "Payment initiation failed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record pending transaction using service role
    const serviceClient = createClient(
      supabaseUrl,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await serviceClient.from("transactions").insert({
      user_id: user.id,
      amount: Number(amount),
      type: "deposit",
      status: "pending",
      payment_method: "mpesa",
      reference: sonicData.data.order_id,
      description: `Deposit via mobile money (${phoneClean})`,
    });

    return new Response(
      JSON.stringify({
        success: true,
        order_id: sonicData.data.order_id,
        message: "Push USSD sent to your phone. Please approve the payment.",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Deposit error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
