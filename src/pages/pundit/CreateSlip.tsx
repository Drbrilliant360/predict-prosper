import PunditLayout from "@/components/PunditLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CreateSlip = () => {
  return (
    <PunditLayout>
      <h1 className="mb-6 text-2xl font-bold tracking-tight-custom text-foreground">Create New Slip</h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl rounded-xl border border-border bg-card p-6"
      >
        <div className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs text-muted-foreground">Sport</Label>
              <select className="mt-1 flex h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none">
                <option>Football</option>
                <option>Basketball</option>
                <option>Tennis</option>
                <option>Ice Hockey</option>
              </select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">League</Label>
              <Input placeholder="e.g. NBC Premier League" className="mt-1 bg-secondary/50 border-border" />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Match</Label>
            <Input placeholder="e.g. Simba SC vs Young Africans" className="mt-1 bg-secondary/50 border-border" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs text-muted-foreground">Market Type</Label>
              <select className="mt-1 flex h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none">
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
              <select className="mt-1 flex h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none">
                <option>M-Bet</option>
                <option>BetPawa</option>
                <option>1xBet</option>
                <option>Betway</option>
                <option>Bet365</option>
                <option>Betika</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label className="text-xs text-muted-foreground">Odds</Label>
              <Input type="number" step="0.01" placeholder="2.50" className="mt-1 bg-secondary/50 border-border font-mono" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Price (TSh)</Label>
              <Input type="number" placeholder="5000" className="mt-1 bg-secondary/50 border-border font-mono" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Stake Level (1-5 units)</Label>
              <select className="mt-1 flex h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label className="text-xs text-muted-foreground">Confidence</Label>
              <select className="mt-1 flex h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Risk Level</Label>
              <select className="mt-1 flex h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Expiry (hours)</Label>
              <Input type="number" placeholder="24" className="mt-1 bg-secondary/50 border-border font-mono" />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Prediction Details</Label>
            <Textarea placeholder="Your analysis and prediction..." className="mt-1 bg-secondary/50 border-border min-h-[100px]" />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Visibility</Label>
            <select className="mt-1 flex h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 text-sm text-foreground outline-none">
              <option>Public (Preview + Paid Unlock)</option>
              <option>Followers Only</option>
              <option>Premium Tier</option>
              <option>Free Teaser</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 tap-scale flex-1">
              Publish Slip
            </Button>
            <Button variant="outline" className="tap-scale">
              Save as Draft
            </Button>
          </div>
        </div>
      </motion.div>
    </PunditLayout>
  );
};

export default CreateSlip;
