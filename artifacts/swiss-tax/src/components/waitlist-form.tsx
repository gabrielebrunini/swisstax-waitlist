import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage } from "@/lib/language";
import { useSubmitWaitlistLead, ApiError } from "@workspace/api-client-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const CANTONS = [
  "Zurich", "Bern", "Lucerne", "Uri", "Schwyz", "Obwalden", "Nidwalden",
  "Glarus", "Zug", "Fribourg", "Solothurn", "Basel-City", "Basel-Landschaft",
  "Schaffhausen", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "St. Gallen",
  "Graubünden", "Aargau", "Thurgau", "Ticino", "Vaud", "Valais", "Neuchâtel",
  "Geneva", "Jura"
];

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email address"),
  canton: z.string().min(1, "Canton is required"),
  situation: z.string().min(1, "Situation is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function WaitlistForm() {
  const { t } = useLanguage();
  const [success, setSuccess] = useState(false);
  const [conflict, setConflict] = useState(false);
  const submitLead = useSubmitWaitlistLead();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      canton: "",
      situation: "",
    },
  });

  const SITUATIONS = [
    { value: "expat", en: "Expat / recently moved to Switzerland", de: "Expat / kürzlich in die Schweiz gezogen" },
    { value: "student", en: "Student (18+)", de: "Student (18+)" },
    { value: "first-time", en: "First-time filer", de: "Erstanmeldend" },
    { value: "changed-canton", en: "Changed canton", de: "Kanton gewechselt" },
    { value: "other", en: "Other", de: "Andere" },
  ];

  const onSubmit = async (data: FormValues) => {
    setSuccess(false);
    setConflict(false);
    
    submitLead.mutate({ data }, {
      onSuccess: () => {
        setSuccess(true);
      },
      onError: (error) => {
        if (error instanceof ApiError && error.status === 409) {
          setConflict(true);
        }
      }
    });
  };

  if (success) {
    return (
      <div className="bg-card border rounded-lg p-8 text-center" data-testid="msg-success">
        <h3 className="text-xl font-semibold mb-2">
          {t("You're on the list!", "Sie sind auf der Liste!")}
        </h3>
        <p className="text-muted-foreground mb-4">
          {t(
            "Thanks for joining. We'll be in touch soon.",
            "Danke für Ihre Anmeldung. Wir melden uns bald."
          )}
        </p>
        <p className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          {t(
            "Your data is stored securely, never used for AI training, and never shared with third parties.",
            "Ihre Daten werden sicher gespeichert, nie für KI-Training verwendet und nie mit Dritten geteilt."
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border shadow-xl rounded-xl p-6 md:p-8">
      {conflict && (
        <div className="bg-primary/10 text-primary border border-primary/20 p-4 rounded-md mb-6" data-testid="msg-conflict">
          {t("You're already on the list!", "Sie stehen bereits auf der Warteliste!")}
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("First Name", "Vorname")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("Jane", "Anna")} data-testid="input-firstname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="hello@example.com" data-testid="input-email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="canton"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Canton", "Kanton")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-canton">
                        <SelectValue placeholder={t("Select a canton", "Kanton wählen")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CANTONS.map((canton) => (
                        <SelectItem key={canton} value={canton}>
                          {canton}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="situation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Situation", "Situation")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-situation">
                        <SelectValue placeholder={t("Select situation", "Situation wählen")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SITUATIONS.map((sit) => (
                        <SelectItem key={sit.value} value={t(sit.en, sit.de)}>
                          {t(sit.en, sit.de)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full mt-4 h-12 text-lg" 
            disabled={submitLead.isPending}
            data-testid="btn-submit"
          >
            {submitLead.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {t("Join the waitlist", "Auf die Warteliste")}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            {t(
              "We protect your privacy. Your data is stored securely, never used for AI training, and never sold or shared.",
              "Wir schützen Ihre Privatsphäre. Ihre Daten werden sicher gespeichert, nie für KI-Training verwendet und nie verkauft oder weitergegeben."
            )}
          </p>
        </form>
      </Form>
    </div>
  );
}
