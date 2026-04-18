import { useLanguage } from "@/lib/language";
import { Link } from "wouter";
import { Logo } from "@/components/logo";

export function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Logo size={30} />
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-full bg-secondary p-1">
            <button
              data-testid="btn-lang-en"
              onClick={() => setLanguage("EN")}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                language === "EN" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              data-testid="btn-lang-de"
              onClick={() => setLanguage("DE")}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                language === "DE" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              DE
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
