import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <p className="text-sm font-medium text-primary mb-3">404</p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          {t("Page not found", "Seite nicht gefunden")}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t(
            "The page you're looking for doesn't exist or has been moved.",
            "Die gesuchte Seite existiert nicht oder wurde verschoben."
          )}
        </p>
        <Link href="/">
          <Button>{t("Back to home", "Zurück zur Startseite")}</Button>
        </Link>
      </div>
    </div>
  );
}
