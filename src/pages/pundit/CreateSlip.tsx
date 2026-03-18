import { useState, useRef } from "react";
import PunditLayout from "@/components/PunditLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Image, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateSlip = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [sport, setSport] = useState("Football");
  const [league, setLeague] = useState("");
  const [matchName, setMatchName] = useState("");
  const [market, setMarket] = useState("Match Result");
  const [bookmaker, setBookmaker] = useState("M-Bet");
  const [odds, setOdds] = useState("");
  const [price, setPrice] = useState("");
  const [confidence, setConfidence] = useState<"high" | "medium" | "low">("medium");
  const [risk, setRisk] = useState<"low" | "medium" | "high">("medium");
  const [expiry, setExpiry] = useState("24");
  const [prediction, setPrediction] = useState("");
  const [title, setTitle] = useState("");
  const [betslipCode, setBetslipCode] = useState("");
  const [betslipImage, setBetslipImage] = useState<File | null>(null);
  const [betslipPreview, setBetslipPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    setBetslipImage(file);
    setBetslipPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setBetslipImage(null);
    setBetslipPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!betslipImage || !user) return null;
    setUploading(true);
    const ext = betslipImage.name.split(".").pop();
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("betslip-images")
      .upload(path, betslipImage);
    setUploading(false);
    if (error) {
      toast.error("Image upload failed");
      return null;
    }
    const { data: urlData } = supabase.storage
      .from("betslip-images")
      .getPublicUrl(path);
    return urlData.publicUrl;
  };

  const handleSubmit = async (isDraft = false) => {
    if (!user) return;
    if (!league || !matchName || !odds || !title) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      let imageUrl: string | null = null;
      if (betslipImage) {
        imageUrl = await uploadImage();
      }

      const expiresAt = expiry
        ? new Date(Date.now() + Number(expiry) * 60 * 60 * 1000).toISOString()
        : null;

      const { error } = await supabase.from("slips").insert({
        pundit_id: user.id,
        title,
        sport,
        league,
        match_name: matchName,
        market,
        bookmaker,
        odds: Number(odds),
        price: Number(price) || 1000,
        confidence,
        risk,
        prediction,
        expires_at: expiresAt,
        status: isDraft ? "pending" : "pending",
        betslip_code: betslipCode || null,
        betslip_image_url: imageUrl,
      } as any);

      if (error) throw error;
      toast.success(isDraft ? "Draft saved!" : "Slip published!");
      navigate("/punter/slips");
    } catch (err: any) {
      toast.error(err.message || "Failed to create slip");
    } finally {
      setSubmitting(false);
    }
  };

  const selectClass = "mt-1 flex h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none";

  return (
    <PunditLayout>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground">Create New Slip</h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl rounded-xl border border-border bg-card p-6"
      >
        <div className="grid gap-5">
          <div>
            <Label className="text-xs text-muted-foreground">Slip Title *</Label>
            <Input
              placeholder="e.g. Simba SC Win - Sure Bet"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 bg-secondary/50 border-border"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs text-muted-foreground">Sport</Label>
              <select value={sport} onChange={(e) => setSport(e.target.value)} className={selectClass}>
                <option>Football</option>
                <option>Basketball</option>
                <option>Tennis</option>
                <option>Ice Hockey</option>
              </select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">League *</Label>
              <Input
                placeholder="e.g. NBC Premier League"
                value={league}
                onChange={(e) => setLeague(e.target.value)}
                className="mt-1 bg-secondary/50 border-border"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Match *</Label>
            <Input
              placeholder="e.g. Simba SC vs Young Africans"
              value={matchName}
              onChange={(e) => setMatchName(e.target.value)}
              className="mt-1 bg-secondary/50 border-border"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs text-muted-foreground">Market Type</Label>
              <select value={market} onChange={(e) => setMarket(e.target.value)} className={selectClass}>
                <option>Match Result</option>
                <option>Over/Under</option>
                <option>BTTS</option>
                <option>Asian Handicap</option>
                <option>Correct Score</option>
                <option>Double Chance</option>
              </select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Bookmaker</Label>
              <select value={bookmaker} onChange={(e) => setBookmaker(e.target.value)} className={selectClass}>
                <option>M-Bet</option>
                <option>BetPawa</option>
                <option>1xBet</option>
                <option>Betway</option>
                <option>Bet365</option>
                <option>Betika</option>
              </select>
            </div>
          </div>

          {/* Betslip Code & Image */}
          <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Image className="h-4 w-4 text-primary" />
              Betslip Details
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs text-muted-foreground">Betslip Code</Label>
                <Input
                  placeholder="e.g. BET-12345678"
                  value={betslipCode}
                  onChange={(e) => setBetslipCode(e.target.value)}
                  className="mt-1 bg-secondary/50 border-border font-mono"
                />
                <p className="mt-1 text-[10px] text-muted-foreground">Code from the bookmaker for verification</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Betslip Image</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                {betslipPreview ? (
                  <div className="mt-1 relative group">
                    <img
                      src={betslipPreview}
                      alt="Betslip preview"
                      className="h-32 w-full rounded-lg object-cover border border-border"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-1 right-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-1 flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                      <p className="mt-1 text-xs text-muted-foreground">Upload screenshot</p>
                      <p className="text-[10px] text-muted-foreground">Max 5MB</p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label className="text-xs text-muted-foreground">Odds *</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="2.50"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
                className="mt-1 bg-secondary/50 border-border font-mono"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Price (TSh)</Label>
              <Input
                type="number"
                placeholder="5000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 bg-secondary/50 border-border font-mono"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Expiry (hours)</Label>
              <Input
                type="number"
                placeholder="24"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="mt-1 bg-secondary/50 border-border font-mono"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs text-muted-foreground">Confidence</Label>
              <select value={confidence} onChange={(e) => setConfidence(e.target.value as any)} className={selectClass}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Risk Level</Label>
              <select value={risk} onChange={(e) => setRisk(e.target.value as any)} className={selectClass}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Prediction Details</Label>
            <Textarea
              placeholder="Your analysis and prediction..."
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
              className="mt-1 bg-secondary/50 border-border min-h-[100px]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => handleSubmit(false)}
              disabled={submitting || uploading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 tap-scale flex-1 gap-2"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {submitting ? "Publishing..." : "Publish Slip"}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSubmit(true)}
              disabled={submitting || uploading}
              className="tap-scale"
            >
              Save as Draft
            </Button>
          </div>
        </div>
      </motion.div>
    </PunditLayout>
  );
};

export default CreateSlip;
