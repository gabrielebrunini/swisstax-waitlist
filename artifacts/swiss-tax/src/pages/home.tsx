import { useLanguage } from "@/lib/language";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WaitlistForm } from "@/components/waitlist-form";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40">
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero-mountain.png" 
              alt="Swiss mountain" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
          </div>
          
          <div className="container relative z-10 mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-xl"
              >
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6">
                  {t("Coming soon for the 2024 tax year", "Demnächst für das Steuerjahr 2024")}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  {t("Your Swiss taxes, simplified by AI.", "Ihre Schweizer Steuern, vereinfacht durch KI.")}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  {t(
                    "Tax filing for beginners — expats, students, and first-timers across Switzerland. Calm, accurate, and perfectly tailored to your canton.",
                    "Steuererklärung für Einsteiger — Expats, Studierende und Erstanmeldende in der ganzen Schweiz. Ruhig, präzise und perfekt auf Ihren Kanton zugeschnitten."
                  )}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <WaitlistForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-muted/10 border-y border-border/40">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                {t("How it works", "Wie es funktioniert")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t(
                  "We've stripped away the jargon and complexity. Answer simple questions, and we do the heavy lifting.",
                  "Wir haben den Fachjargon und die Komplexität beseitigt. Beantworten Sie einfache Fragen, und wir erledigen die schwere Arbeit."
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: t("Upload your documents", "Dokumente hochladen"),
                  desc: t("Simply drag and drop your salary certificate, bank statements, and deduction receipts.", "Laden Sie einfach Ihren Lohnausweis, Kontoauszüge und Abzugsbelege hoch.")
                },
                {
                  step: "02",
                  title: t("AI analyzes and optimizes", "KI analysiert und optimiert"),
                  desc: t("Our model finds deductions you didn't know existed, specific to your canton's rules.", "Unser Modell findet Abzüge, von denen Sie nicht wussten, dass sie existieren, spezifisch für Ihren Kanton.")
                },
                {
                  step: "03",
                  title: t("Review and file", "Überprüfen und einreichen"),
                  desc: t("Get a clear, plain-language summary before we help you submit to your local tax office.", "Erhalten Sie eine klare, leicht verständliche Zusammenfassung, bevor wir Ihnen bei der Einreichung helfen.")
                }
              ].map((item, i) => (
                <div key={i} className="bg-card border rounded-xl p-6 relative overflow-hidden">
                  <div className="text-5xl font-bold text-muted/30 absolute -top-4 -right-2">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-3 relative z-10 mt-4">{item.title}</h3>
                  <p className="text-muted-foreground relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/abstract-finance.png" 
                alt="Abstract finance" 
                className="rounded-2xl border shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {t("Swiss precision. Total privacy.", "Schweizer Präzision. Absolute Privatsphäre.")}
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">{t("Data stays in Switzerland", "Daten bleiben in der Schweiz")}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{t("All processing happens on Swiss servers.", "Die gesamte Verarbeitung erfolgt auf Schweizer Servern.")}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">{t("Never used for AI training", "Nie für KI-Training verwendet")}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{t("Your personal financial data is your own.", "Ihre persönlichen Finanzdaten gehören Ihnen.")}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">{t("Bank-level encryption", "Bankenübliche Verschlüsselung")}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{t("AES-256 encryption at rest and in transit.", "AES-256 Verschlüsselung im Ruhezustand und bei der Übertragung.")}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
