import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Platform Fees",
    items: [
      { label: "Commission Rate", value: "15%", desc: "Applied to all punter earnings" },
      { label: "Payment Processing Fee", value: "2.9% + TSh 700", desc: "Per transaction" },
      { label: "Withdrawal Fee", value: "TSh 3,500", desc: "Per payout request" },
    ],
  },
  {
    title: "Slip Configuration",
    items: [
      { label: "Min Slip Price", value: "TSh 1,000", desc: "Minimum price punters can set" },
      { label: "Max Slip Price", value: "TSh 50,000", desc: "Maximum price per slip" },
      { label: "Default Expiry", value: "24 hours", desc: "Auto-expire after posting" },
    ],
  },
  {
    title: "Moderation",
    items: [
      { label: "Auto-Flag Threshold", value: "3 reports", desc: "Slips auto-flagged after N reports" },
      { label: "KYC Required", value: "Yes", desc: "For all punter accounts" },
      { label: "Content Review", value: "Manual", desc: "First 5 slips require admin approval" },
    ],
  },
];

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight-custom text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Platform configuration and business rules.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.08 }}
            className="rounded-xl border border-border bg-card"
          >
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold tracking-tight-custom text-foreground">{section.title}</h2>
            </div>
            <div className="divide-y divide-border/50">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <span className="font-mono text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
        <Button className="bg-cta text-accent-foreground hover:bg-cta-hover tap-scale">Save Changes</Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
