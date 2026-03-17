import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Phone, Mail, FileQuestion, ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do I purchase a slip?", a: "Browse pundits, select a slip, and pay via M-Pesa, Tigo Pesa, or your wallet balance. Once paid, the prediction is unlocked." },
  { q: "What happens if a match is cancelled?", a: "If a match is cancelled or postponed, the slip is marked as 'void' and your payment is refunded to your wallet within 24 hours." },
  { q: "How do I withdraw from my wallet?", a: "Go to Wallet → Withdraw, choose M-Pesa or Tigo Pesa, enter the amount (minimum TSh 5,000), and confirm. Payouts process within 1-2 hours." },
  { q: "Can I get a refund on a losing slip?", a: "No, slips are predictions and not guaranteed. However, if a pundit violates platform rules, you can file a dispute." },
  { q: "How do I become a pundit?", a: "Apply through the Pundit Registration form. You'll need to verify your identity (KYC) and demonstrate betting knowledge. Approval takes 2-5 business days." },
];

const Support = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Support</h1>
        <p className="mt-1 text-sm text-muted-foreground">Get help, ask questions, or report issues.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 max-w-4xl">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <h2 className="text-sm font-semibold text-foreground mb-3">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <h2 className="text-sm font-semibold text-foreground mb-3">Contact Us</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">+255 222 123 456</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground"><span className="text-sm text-foreground">support@kanji.co.tz</span></span>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">WhatsApp: +255 712 000 000</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <h2 className="text-sm font-semibold text-foreground mb-4">Submit a Ticket</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Subject</label>
              <Input placeholder="e.g. Refund request, Account issue..." className="mt-1" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <select className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none">
                <option>Payment Issue</option>
                <option>Slip Dispute</option>
                <option>Account Problem</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <Textarea placeholder="Describe your issue in detail..." className="mt-1" rows={5} />
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Submit Ticket</Button>
          </form>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Support;
