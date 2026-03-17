import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Bell, Globe, Lock, Palette, Smartphone } from "lucide-react";

const sections = [
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Slip Results", desc: "Get notified when your purchased slips settle", defaultOn: true },
      { label: "New Slips from Favourites", desc: "Alert when favourite pundits post new slips", defaultOn: true },
      { label: "Promotions & Offers", desc: "Receive discount and bundle notifications", defaultOn: false },
    ],
  },
  {
    title: "Privacy",
    icon: Lock,
    items: [
      { label: "Show Profile Publicly", desc: "Allow other users to see your profile", defaultOn: true },
      { label: "Show Purchase History", desc: "Display slips you've bought on your profile", defaultOn: false },
    ],
  },
  {
    title: "Preferences",
    icon: Globe,
    items: [
      { label: "Language", desc: "Swahili / English", defaultOn: true },
      { label: "Odds Format", desc: "Decimal odds display", defaultOn: true },
    ],
  },
];

const Settings = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account preferences and notifications.</p>
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
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <section.icon className="h-4 w-4 text-primary" />
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
          <h2 className="text-sm font-semibold text-foreground mb-3">Account</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Phone Number</p>
                <p className="text-xs text-muted-foreground">+255 712 345 678</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-xs text-muted-foreground">john@example.co.tz</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-destructive">Delete Account</p>
                <p className="text-xs text-muted-foreground">Permanently remove your account and data</p>
              </div>
              <Button variant="destructive" size="sm">Delete</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Settings;
