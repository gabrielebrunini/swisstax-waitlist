import { useLanguage } from "@/lib/language";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/40 py-12 px-4 bg-muted/20">
      <div className="container mx-auto text-center text-sm text-muted-foreground max-w-2xl">
        <p className="mb-4">
          {t(
            "We protect your privacy. Your data is stored securely, never used for AI training, and never sold or shared.",
            "Wir schützen Ihre Privatsphäre. Ihre Daten werden sicher gespeichert, nie für KI-Training verwendet und nie verkauft oder weitergegeben."
          )}
        </p>
        <p>© {new Date().getFullYear()} swissTax. All rights reserved.</p>
      </div>
    </footer>
  );
}
