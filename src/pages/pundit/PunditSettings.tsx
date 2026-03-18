import PunditLayout from "@/components/PunditLayout";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Slip Defaults",
    items: [
      { label: "Auto-Lock Before Kickoff", desc: "Automatically lock slips 30 minutes before match starts", defaultOn: true },
      { label: "Default Currency", desc: "TSh (Tanzanian Shilling)", defaultOn: true },
      { label: "Show Odds History", desc: "Display odds movement on your slip cards", defaultOn: false },
    ],
  },
  {
    title: "Notifications",
    items: [
      { label: "New Follower Alerts", desc: "Get notified when someone follows you", defaultOn: true },
      { label: "Slip Purchase Alerts", desc: "Notification when a customer buys your slip", defaultOn: true },
      { label: "Review Notifications", desc: "Alert when a customer leaves a review", defaultOn: true },
      { label: "Payout Confirmation", desc: "SMS confirmation when withdrawal is processed", defaultOn: true },
    ],
  },
  {
    title: "Payout Preferences",
    items: [
      { label: "Auto-Withdraw Weekly", desc: "Automatically withdraw earnings every Friday", defaultOn: false },
      { label: "Minimum Payout Threshold", desc: "Only withdraw when balance exceeds TSh 50,000", defaultOn: true },
    ],
  },
];

const PunditSettings = () => {
  return (
    <PunditLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Configure your punter account preferences.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.08 }}
            className="rounded-xl border border-border bg-card"
          >
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold text-foreground">{section.title}</h2>
            </div>
            <div className="divide-y divide-border/50">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.defaultOn} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <h2 className="text-sm font-semibold text-foreground mb-3">Withdrawal Method</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">M-Pesa</p>
                <p className="text-xs text-muted-foreground">+255 754 321 000</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Primary</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Bank Transfer</p>
                <p className="text-xs text-muted-foreground">CRDB Bank •••• 4521</p>
              </div>
              <Button variant="outline" size="sm">Set Primary</Button>
            </div>
          </div>
        </motion.div>

        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
      </div>
    </PunditLayout>
  );
};

export default PunditSettings;
