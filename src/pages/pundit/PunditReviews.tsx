import PunditLayout from "@/components/PunditLayout";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { id: 1, user: "Juma Mwalimu", rating: 5, comment: "Best football tipster in TZ. Consistent wins!", date: "2026-03-16", slip: "Simba vs Yanga" },
  { id: 2, user: "Amina Hassan", rating: 4, comment: "Good analysis but sometimes odds are too low.", date: "2026-03-15", slip: "Azam vs Namungo" },
  { id: 3, user: "Neema Kimaro", rating: 5, comment: "Bongo Tips never disappoints. 🔥", date: "2026-03-14", slip: "Arsenal vs Chelsea" },
  { id: 4, user: "Baraka Shao", rating: 3, comment: "Decent picks. Lost a few recently but overall good.", date: "2026-03-12", slip: "Man City vs Liverpool" },
  { id: 5, user: "Lilian Moshi", rating: 5, comment: "Very transparent. Love the proof screenshots.", date: "2026-03-10", slip: "Coastal vs KMC" },
];

const PunditReviews = () => {
  return (
    <PunditLayout>
      <h1 className="mb-6 text-2xl font-bold tracking-tight-custom text-foreground">Reviews</h1>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 mb-8">
        {[
          { label: "Average Rating", value: "4.4 / 5" },
          { label: "Total Reviews", value: "248" },
          { label: "5-Star Reviews", value: "68%" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
            <p className="font-mono text-xl font-bold text-foreground mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                  {review.user.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{review.user}</p>
                  <p className="text-xs text-muted-foreground">{review.slip} · {review.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? "text-pending fill-pending" : "text-muted"}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </PunditLayout>
  );
};

export default PunditReviews;
