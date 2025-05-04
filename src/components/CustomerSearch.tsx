
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface CustomerSearchProps {
  onSearch: (customerId: string) => void;
  title: string;
}

const CustomerSearch = ({ onSearch, title }: CustomerSearchProps) => {
  const [customerId, setCustomerId] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a customer ID",
        variant: "destructive",
      });
      return;
    }
    onSearch(customerId);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <Label htmlFor="customerId" className="mb-2 block">
              Customer ID
            </Label>
            <Input
              id="customerId"
              type="text"
              placeholder="Enter customer ID (e.g. SFD12345)"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="bg-accent hover:bg-accent/90">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerSearch;
