
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import CustomerSearch from "@/components/CustomerSearch";
import { QualityRecord, qualityRecords } from "@/utils/mockData";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Quality = () => {
  const [filteredRecords, setFilteredRecords] = useState<QualityRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchedCustomerId, setSearchedCustomerId] = useState("");
  const [editMode, setEditMode] = useState<number | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<QualityRecord>>({
    clothType: "",
    itemName: "",
    colour: "",
    status: "verified",
    reason: "",
    supervisorName: "",
  });

  const handleSearch = (customerId: string) => {
    // In a real app, this would be an API call
    const records = qualityRecords.filter(
      (record) => record.customerId.toLowerCase() === customerId.toLowerCase()
    );

    if (records.length === 0) {
      toast({
        title: "No records found",
        description: `No quality records found for customer ID: ${customerId}`,
      });
    }

    setFilteredRecords(records);
    setSearchedCustomerId(customerId);
    setShowHistory(true);
    setShowForm(false);
  };

  const handleNewRecord = () => {
    setShowForm(true);
    setShowHistory(false);
    setFormData({
      clothType: "",
      itemName: "",
      colour: "",
      status: "verified",
      reason: "",
      supervisorName: "",
    });
    setEditMode(null);
  };

  const handleViewHistory = () => {
    setShowHistory(true);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call to save the record
    
    const newRecord: QualityRecord = {
      id: Date.now(),
      customerId: searchedCustomerId,
      clothType: formData.clothType || "",
      itemName: formData.itemName || "",
      colour: formData.colour || "",
      status: formData.status as "verified" | "not verified" || "verified",
      reason: formData.status === "not verified" ? formData.reason : undefined,
      supervisorName: formData.supervisorName || "",
      date: new Date().toISOString().split("T")[0],
      photo: formData.photo,
    };

    if (editMode !== null) {
      // Update existing record
      const updatedRecords = filteredRecords.map((record) =>
        record.id === editMode ? { ...record, ...newRecord, id: record.id } : record
      );
      setFilteredRecords(updatedRecords);
      toast({
        title: "Record updated",
        description: "The quality record has been updated successfully",
      });
    } else {
      // Add new record
      setFilteredRecords([...filteredRecords, newRecord]);
      toast({
        title: "Record added",
        description: "New quality record has been added successfully",
      });
    }

    setShowForm(false);
    setShowHistory(true);
    setEditMode(null);
  };

  const handleEdit = (id: number) => {
    const recordToEdit = filteredRecords.find((record) => record.id === id);
    if (recordToEdit) {
      setFormData({
        clothType: recordToEdit.clothType,
        itemName: recordToEdit.itemName,
        colour: recordToEdit.colour,
        status: recordToEdit.status,
        reason: recordToEdit.reason || "",
        supervisorName: recordToEdit.supervisorName,
        photo: recordToEdit.photo,
      });
      setEditMode(id);
      setShowForm(true);
      setShowHistory(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Quality Control</h1>
        
        <CustomerSearch 
          onSearch={handleSearch} 
          title="Search Quality Records"
        />

        {searchedCustomerId && (
          <div className="mb-6 flex flex-wrap gap-3">
            <Button 
              onClick={handleNewRecord}
              className="bg-accent hover:bg-accent/90"
            >
              Add New Record
            </Button>
            <Button 
              onClick={handleViewHistory}
              variant="outline"
            >
              View History
            </Button>
          </div>
        )}

        {showForm && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">
                {editMode !== null ? "Edit Quality Record" : "New Quality Record"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="itemName">Item Name</Label>
                    <Input
                      id="itemName"
                      value={formData.itemName}
                      onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="clothType">Cloth Type</Label>
                    <Input
                      id="clothType"
                      value={formData.clothType}
                      onChange={(e) => setFormData({ ...formData, clothType: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="colour">Colour</Label>
                    <Input
                      id="colour"
                      value={formData.colour}
                      onChange={(e) => setFormData({ ...formData, colour: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "verified" | "not verified") => 
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="not verified">Not Verified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.status === "not verified" && (
                    <div className="md:col-span-2">
                      <Label htmlFor="reason">Reason</Label>
                      <Textarea
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        placeholder="Enter reason for not verifying"
                        required
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="supervisorName">Supervisor Name</Label>
                    <Input
                      id="supervisorName"
                      value={formData.supervisorName}
                      onChange={(e) => setFormData({ ...formData, supervisorName: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="photo">Upload Photo</Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="cursor-pointer"
                    />
                  </div>
                  
                  {formData.photo && (
                    <div className="md:col-span-2">
                      <Label>Preview</Label>
                      <div className="mt-2 border rounded-md overflow-hidden">
                        <img 
                          src={formData.photo} 
                          alt="Preview" 
                          className="max-h-48 object-contain mx-auto"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setShowHistory(true);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-accent hover:bg-accent/90">
                    {editMode !== null ? "Update" : "Submit"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {showHistory && filteredRecords.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">
                Quality Records for {searchedCustomerId}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="px-4 py-2 text-left">Item Name</th>
                      <th className="px-4 py-2 text-left">Cloth Type</th>
                      <th className="px-4 py-2 text-left">Colour</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Reason</th>
                      <th className="px-4 py-2 text-left">Supervisor</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Photo</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="border-b">
                        <td className="px-4 py-2">{record.itemName}</td>
                        <td className="px-4 py-2">{record.clothType}</td>
                        <td className="px-4 py-2">{record.colour}</td>
                        <td className="px-4 py-2">
                          <span 
                            className={`px-2 py-1 rounded-full text-xs ${
                              record.status === "verified" ? "verified" : "not-verified"
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">{record.reason || "-"}</td>
                        <td className="px-4 py-2">{record.supervisorName}</td>
                        <td className="px-4 py-2">{record.date}</td>
                        <td className="px-4 py-2">
                          {record.photo ? (
                            <img 
                              src={record.photo} 
                              alt="Quality" 
                              className="h-10 w-10 object-cover rounded"
                            />
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-4 py-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(record.id)}
                          >
                            Edit
                          </Button>
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

export default Quality;
