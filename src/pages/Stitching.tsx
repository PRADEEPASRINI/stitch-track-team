
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import CustomerSearch from "@/components/CustomerSearch";
import { StitchingRecord, stitchingRecords, customers } from "@/utils/mockData";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Stitching = () => {
  const [filteredRecords, setFilteredRecords] = useState<StitchingRecord[]>([]);
  const [searchedCustomerId, setSearchedCustomerId] = useState("");
  const [activeTab, setActiveTab] = useState("status");
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
    
    const records = stitchingRecords.filter(
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
        supervisorName: "",
        tailorName: "",
        status: "not started" as "not started" | "processing" | "done",
        date: "",
      }));
      
      setFilteredRecords(newRecords);
      toast({
        title: "New items found",
        description: `Loaded ${newRecords.length} items for stitching process`,
      });
    } else {
      setFilteredRecords(records);
      toast({
        title: "Records found",
        description: `Found ${records.length} stitching records`,
      });
    }
    
    setSearchedCustomerId(customerId);
  };

  const handleEdit = (id: number) => {
    setEditingId(id === editingId ? null : id);
  };

  const handleSubmit = () => {
    toast({
      title: "Changes saved",
      description: "Stitching information has been updated successfully",
    });
    setEditingId(null);
  };

  const updateRecord = (id: number, field: string, value: string) => {
    setFilteredRecords(
      filteredRecords.map((record) =>
        record.id === id
          ? { 
              ...record, 
              [field]: value,
              date: field === "status" && value !== "not started" 
                ? new Date().toISOString().split("T")[0]
                : record.date 
            }
          : record
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Stitching Process</h1>
        
        <CustomerSearch 
          onSearch={handleSearch} 
          title="Search Stitching Records" 
        />

        {searchedCustomerId && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="status">Status</TabsTrigger>
              <TabsTrigger value="assign">Assign</TabsTrigger>
              <TabsTrigger value="update">Update</TabsTrigger>
            </TabsList>

            <TabsContent value="status">
              {filteredRecords.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Stitching Status for {searchedCustomerId}
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
                            <th className="px-4 py-2 text-left">Supervisor</th>
                            <th className="px-4 py-2 text-left">Tailor</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Date</th>
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
                              <td className="px-4 py-2">{record.supervisorName || "-"}</td>
                              <td className="px-4 py-2">{record.tailorName || "-"}</td>
                              <td className="px-4 py-2">
                                <span 
                                  className={`px-2 py-1 rounded-full text-xs status-${record.status.replace(" ", "-")}`}
                                >
                                  {record.status}
                                </span>
                              </td>
                              <td className="px-4 py-2">{record.date || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="assign">
              {filteredRecords.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Assign Tailors for {searchedCustomerId}
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
                            <th className="px-4 py-2 text-left">Tailor</th>
                            <th className="px-4 py-2 text-left">Supervisor</th>
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
                                  <Input
                                    value={record.tailorName}
                                    onChange={(e) => updateRecord(record.id, "tailorName", e.target.value)}
                                    placeholder="Tailor Name"
                                  />
                                ) : (
                                  record.tailorName || "-"
                                )}
                              </td>
                              <td className="px-4 py-2">
                                {editingId === record.id ? (
                                  <Input
                                    value={record.supervisorName}
                                    onChange={(e) => updateRecord(record.id, "supervisorName", e.target.value)}
                                    placeholder="Supervisor Name"
                                  />
                                ) : (
                                  record.supervisorName || "-"
                                )}
                              </td>
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
            </TabsContent>

            <TabsContent value="update">
              {filteredRecords.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Update Stitching Status for {searchedCustomerId}
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
                            <th className="px-4 py-2 text-left">Tailor</th>
                            <th className="px-4 py-2 text-left">Status</th>
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
                              <td className="px-4 py-2">{record.tailorName || "-"}</td>
                              <td className="px-4 py-2">
                                {editingId === record.id ? (
                                  <Select
                                    value={record.status}
                                    onValueChange={(value: "not started" | "processing" | "done") => 
                                      updateRecord(record.id, "status", value)
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
                                    className={`px-2 py-1 rounded-full text-xs status-${record.status.replace(" ", "-")}`}
                                  >
                                    {record.status}
                                  </span>
                                )}
                              </td>
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
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Stitching;
