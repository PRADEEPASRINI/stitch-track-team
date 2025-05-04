
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import CustomerSearch from "@/components/CustomerSearch";
import { CuttingRecord, cuttingRecords, customers } from "@/utils/mockData";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Cutting = () => {
  const [filteredRecords, setFilteredRecords] = useState<CuttingRecord[]>([]);
  const [searchedCustomerId, setSearchedCustomerId] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSearch = (customerId: string) => {
    // In a real app, this would be an API call
    const customer = customers.find(c => c.id.toLowerCase() === customerId.toLowerCase());
    
    if (!customer) {
      toast({
        title: "Customer not found",
        description: `No customer found with ID: ${customerId}`,
        variant: "destructive",
      });
      setFilteredRecords([]);
      return;
    }
    
    const records = cuttingRecords.filter(
      (record) => record.customerId.toLowerCase() === customerId.toLowerCase()
    );

    if (records.length === 0) {
      // No existing records, create initial records from customer items
      const newRecords = customer.items.map((item, index) => ({
        id: Date.now() + index,
        customerId: customer.id,
        nameOfItem: item.nameOfItem,
        colour: item.colour,
        size: item.size,
        qty: item.qty,
        cuttingStatus: "not started" as "not started" | "processing" | "done",
        supervisorName: "",
        date: "",
      }));
      
      setFilteredRecords(newRecords);
      toast({
        title: "New items found",
        description: `Loaded ${newRecords.length} items for cutting process`,
      });
    } else {
      setFilteredRecords(records);
      toast({
        title: "Records found",
        description: `Found ${records.length} cutting records`,
      });
    }
    
    setSearchedCustomerId(customerId);
  };

  const handleStatusChange = (id: number, status: "not started" | "processing" | "done") => {
    setFilteredRecords(
      filteredRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              cuttingStatus: status,
              supervisorName:
                status !== "not started" ? "Supervisor One" : "",
              date:
                status !== "not started"
                  ? new Date().toISOString().split("T")[0]
                  : "",
            }
          : record
      )
    );
  };

  const handleEdit = (id: number) => {
    setEditingId(id === editingId ? null : id);
  };

  const handleSubmit = () => {
    toast({
      title: "Changes saved",
      description: "Cutting status has been updated successfully",
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Cutting Process</h1>
        
        <CustomerSearch 
          onSearch={handleSearch} 
          title="Search Cutting Records" 
        />

        {filteredRecords.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">
                Cutting Records for {searchedCustomerId}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="px-4 py-2 text-left">S.No</th>
                      <th className="px-4 py-2 text-left">Item Name</th>
                      <th className="px-4 py-2 text-left">Colour</th>
                      <th className="px-4 py-2 text-left">Size</th>
                      <th className="px-4 py-2 text-left">Qty</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Supervisor</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record, index) => (
                      <tr key={record.id} className="border-b">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{record.nameOfItem}</td>
                        <td className="px-4 py-2">{record.colour}</td>
                        <td className="px-4 py-2">{record.size}</td>
                        <td className="px-4 py-2">{record.qty}</td>
                        <td className="px-4 py-2">
                          {editingId === record.id ? (
                            <Select
                              value={record.cuttingStatus}
                              onValueChange={(value: "not started" | "processing" | "done") => 
                                handleStatusChange(record.id, value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="not started">Not Started</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <span 
                              className={`px-2 py-1 rounded-full text-xs status-${record.cuttingStatus.replace(" ", "-")}`}
                            >
                              {record.cuttingStatus}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editingId === record.id ? (
                            <Input
                              value={record.supervisorName}
                              onChange={(e) =>
                                setFilteredRecords(
                                  filteredRecords.map((r) =>
                                    r.id === record.id
                                      ? { ...r, supervisorName: e.target.value }
                                      : r
                                  )
                                )
                              }
                              placeholder="Supervisor Name"
                            />
                          ) : (
                            record.supervisorName || "-"
                          )}
                        </td>
                        <td className="px-4 py-2">{record.date || "-"}</td>
                        <td className="px-4 py-2">
                          {editingId === record.id ? (
                            <Button 
                              size="sm"
                              onClick={handleSubmit}
                              className="bg-accent hover:bg-accent/90"
                            >
                              Submit
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(record.id)}
                            >
                              Change
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Cutting;
