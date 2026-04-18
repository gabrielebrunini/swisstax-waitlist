import { useState } from "react";
import { WaitlistLead } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [leads, setLeads] = useState<WaitlistLead[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/waitlist", {
        headers: {
          "X-Admin-Secret": secret,
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (leads) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Waitlist Leads</h1>
          <Button variant="outline" onClick={() => setLeads(null)}>Lock</Button>
        </div>
        <div className="bg-card border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Canton</TableHead>
                <TableHead>Situation</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.id}</TableCell>
                  <TableCell>{lead.firstName}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.canton}</TableCell>
                  <TableCell>{lead.situation}</TableCell>
                  <TableCell>{format(new Date(lead.createdAt), "PPP")}</TableCell>
                </TableRow>
              ))}
              {leads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No leads yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md bg-card border rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
        <form onSubmit={fetchLeads} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter admin secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            data-testid="input-secret"
          />
          {error && <p className="text-sm text-destructive text-center">Invalid secret. Try again.</p>}
          <Button type="submit" className="w-full" disabled={loading} data-testid="btn-access">
            {loading ? "Verifying..." : "Access"}
          </Button>
        </form>
      </div>
    </div>
  );
}
