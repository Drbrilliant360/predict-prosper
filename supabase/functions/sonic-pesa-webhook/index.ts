import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-sonicpesa-signature",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody = await req.text();

    // Verify webhook signature
    const signature = req.headers.get("x-sonicpesa-signature");
    const secretKey = Deno.env.get("SONIC_PESA_SECRET_KEY")!;

    if (signature) {
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secretKey),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
      const computed = Array.from(new Uint8Array(sig))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (computed !== signature) {
        console.error("Invalid webhook signature");
        return new Response(JSON.stringify({ error: "Invalid signature" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const payload = JSON.parse(rawBody);
    console.log("Webhook received:", payload.event, payload.order_id);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const orderId = payload.order_id;

    // Find the pending transaction
    const { data: tx, error: txError } = await supabase
      .from("transactions")
      .select("*")
      .eq("reference", orderId)
      .eq("status", "pending")
      .maybeSingle();

    if (txError || !tx) {
      console.error("Transaction not found for order:", orderId, txError);
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (payload.event === "payment.completed" && payload.status === "SUCCESS") {
      // Update transaction to completed
      await supabase
        .from("transactions")
        .update({ status: "completed" })
        .eq("id", tx.id);

      // Credit wallet
      const { data: wallet } = await supabase
        .from("wallets")
        .select("balance")
        .eq("user_id", tx.user_id)
        .single();

      if (wallet) {
        await supabase
          .from("wallets")
          .update({ balance: wallet.balance + tx.amount })
          .eq("user_id", tx.user_id);
      }

      console.log(`Wallet credited: user=${tx.user_id}, amount=${tx.amount}`);
    } else if (
      payload.event === "payment.failed" ||
      payload.event === "payment.cancelled"
    ) {
      await supabase
        .from("transactions")
        .update({ status: "failed" })
        .eq("id", tx.id);

      console.log(`Payment failed/cancelled for order: ${orderId}`);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
