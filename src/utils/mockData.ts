
export type QualityRecord = {
  id: number;
  customerId: string;
  clothType: string;
  itemName: string;
  colour: string;
  status: 'verified' | 'not verified';
  reason?: string;
  photo?: string;
  supervisorName: string;
  date: string;
};

export type CuttingRecord = {
  id: number;
  customerId: string;
  nameOfItem: string;
  colour: string;
  size: string;
  qty: number;
  cuttingStatus: 'done' | 'processing' | 'not started';
  supervisorName: string;
  date: string;
};

export type StitchingRecord = {
  id: number;
  customerId: string;
  nameOfItem: string;
  colour: string;
  size: string;
  qty: number;
  supervisorName: string;
  tailorName: string;
  status: 'done' | 'processing' | 'not started';
  date: string;
};

export type CustomerInfo = {
  id: string;
  items: {
    nameOfItem: string;
    colour: string;
    itemType: string;
    size: string;
    qty: number;
  }[];
};

// Mock customers data
export const customers: CustomerInfo[] = [
  {
    id: "SFD12345",
    items: [
      {
        nameOfItem: "Women's V-Neck T-Shirt",
        colour: "Navy",
        itemType: "poly-cotton",
        size: "S",
        qty: 100
      },
      {
        nameOfItem: "Women's V-Neck T-Shirt",
        colour: "Navy",
        itemType: "poly-cotton",
        size: "XL",
        qty: 100
      },
      {
        nameOfItem: "Men's Crew Neck T-Shirt",
        colour: "White",
        itemType: "cotton",
        size: "L",
        qty: 100
      },
      {
        nameOfItem: "Men's Crew Neck T-Shirt",
        colour: "White",
        itemType: "cotton",
        size: "M",
        qty: 100
      }
    ]
  }
];

// Mock quality records
export const qualityRecords: QualityRecord[] = [
  {
    id: 1,
    customerId: "SFD12345",
    clothType: "poly-cotton",
    itemName: "Women's V-Neck T-Shirt",
    colour: "Navy",
    status: "verified",
    supervisorName: "John Doe",
    date: "2025-05-02"
  },
  {
    id: 2,
    customerId: "SFD12345",
    clothType: "cotton",
    itemName: "Men's Crew Neck T-Shirt",
    colour: "White",
    status: "not verified",
    reason: "Fabric inconsistency",
    supervisorName: "Jane Smith",
    date: "2025-05-03"
  }
];

// Mock cutting records
export const cuttingRecords: CuttingRecord[] = [
  {
    id: 1,
    customerId: "SFD12345",
    nameOfItem: "Women's V-Neck T-Shirt",
    colour: "Navy",
    size: "S",
    qty: 100,
    cuttingStatus: "done",
    supervisorName: "Mike Johnson",
    date: "2025-05-02"
  },
  {
    id: 2,
    customerId: "SFD12345",
    nameOfItem: "Women's V-Neck T-Shirt",
    colour: "Navy",
    size: "XL",
    qty: 100,
    cuttingStatus: "processing",
    supervisorName: "Mike Johnson",
    date: "2025-05-03"
  },
  {
    id: 3,
    customerId: "SFD12345",
    nameOfItem: "Men's Crew Neck T-Shirt",
    colour: "White",
    size: "L",
    qty: 100,
    cuttingStatus: "not started",
    supervisorName: "",
    date: ""
  },
  {
    id: 4,
    customerId: "SFD12345",
    nameOfItem: "Men's Crew Neck T-Shirt",
    colour: "White",
    size: "M",
    qty: 100,
    cuttingStatus: "not started",
    supervisorName: "",
    date: ""
  }
];

// Mock stitching records
export const stitchingRecords: StitchingRecord[] = [
  {
    id: 1,
    customerId: "SFD12345",
    nameOfItem: "Women's V-Neck T-Shirt",
    colour: "Navy",
    size: "S",
    qty: 100,
    supervisorName: "Sarah Williams",
    tailorName: "Alex Chen",
    status: "processing",
    date: "2025-05-04"
  },
  {
    id: 2,
    customerId: "SFD12345",
    nameOfItem: "Women's V-Neck T-Shirt",
    colour: "Navy",
    size: "XL",
    qty: 100,
    supervisorName: "",
    tailorName: "",
    status: "not started",
    date: ""
  },
  {
    id: 3,
    customerId: "SFD12345",
    nameOfItem: "Men's Crew Neck T-Shirt",
    colour: "White",
    size: "L",
    qty: 100,
    supervisorName: "",
    tailorName: "",
    status: "not started",
    date: ""
  },
  {
    id: 4,
    customerId: "SFD12345",
    nameOfItem: "Men's Crew Neck T-Shirt",
    colour: "White",
    size: "M",
    qty: 100,
    supervisorName: "",
    tailorName: "",
    status: "not started",
    date: ""
  }
];
