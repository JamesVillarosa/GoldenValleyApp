import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import {Users, ShoppingCart, ArrowRightLeft} from 'lucide-react';
// import { cn } from "@/lib/utils";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock Data (Replace with your actual data fetching)
interface InOutData {
    id: string;
    customerName: string;
    gallonsOrdered: number;
    timeIn: Date;
    timeOut?: Date;
}

interface CustomerData {
    id: string;
    name: string;
    address: string;
    ordersThisMonth: number;
    remarks: string;
}

interface SalesData {
    day: number;
    week: number;
    month: number;
}

const generateMockInOutData = (): InOutData[] => {
    const customers = ['Jane Doe', 'James Villarosa', 'Manang Inday', 'Roger Cruz', 'Mark Reyes'];
    const data: InOutData[] = [];
    for (let i = 0; i < 10; i++) {
        const timeIn = new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24)); // Random time in last 24 hours
        const timeOut = Math.random() > 0.5 ? new Date(timeIn.getTime() + Math.floor(Math.random() * 1000 * 60 * 60 * 12)) : undefined; // Some have timeOut
        data.push({
            id: crypto.randomUUID(),
            customerName: customers[Math.floor(Math.random() * customers.length)],
            gallonsOrdered: Math.floor(Math.random() * 5) + 1, // 1 to 5 gallons
            timeIn: timeIn,
            timeOut: timeOut,
        });
    }
    return data;
};

const generateMockCustomerData = (): CustomerData[] => {
    const customers = [
        { id: crypto.randomUUID(), name: 'Jane Doe', address: 'Blk 6 Lot 9 Phase 2', ordersThisMonth: 12, remarks: 'Bulk Order' },
        { id: crypto.randomUUID(), name: 'James Villarosa', address: 'Blk 1 Lot 4 Phase 3', ordersThisMonth: 5, remarks: 'Once every week delivery' },
        { id: crypto.randomUUID(), name: 'Manang Inday', address: 'Blk 19 Lot 3 Phase 1', ordersThisMonth: 20, remarks: 'Morning Deliver' },
        { id: crypto.randomUUID(), name: 'Roger Cruz', address: 'Blk 1 Lot 4 Bato Street', ordersThisMonth: 8, remarks: 'Pays cash' },
        { id: crypto.randomUUID(), name: 'Mark Reyes', address: 'Blk 1 Lot 4 Purok 1', ordersThisMonth: 15, remarks: 'Pays Gcash' },
    ];
    return customers;
};

const generateMockSalesData = (): SalesData => {
    // const today = new Date();
    // const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    // const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const dailySales = Math.floor(Math.random() * 2000) + 1000;  // Random sales between 50 and 150
    const weeklySales = Math.floor(Math.random() * 10000) + 7000; // Random sales between 300 and 800
    const monthlySales = Math.floor(Math.random() * 60000) + 40000; // Random sales between 1000 and 3000

    return {
        day: dailySales,
        week: weeklySales,
        month: monthlySales,
    };
};

// Helper Functions
const formatTime = (date?: Date) => {
    if (!date) return 'N/A';
    return format(date, 'hh:mm a');
};

const GoldenValleyApp = () => {
    const [inOutData, setInOutData] = useState<InOutData[]>([]);
    const [customerData, setCustomerData] = useState<CustomerData[]>([]);
    const [salesData, setSalesData] = useState<SalesData>({ day: 0, week: 0, month: 0 });
    const [setIsMobile] = useState(false);
    // const [date, setDate] = useState<Date | undefined>(new Date())

    // Mock data loading (replace with actual API calls)
    useEffect(() => {
        // Simulate API calls with setTimeout
        const loadData = () => {
            setInOutData(generateMockInOutData());
            setCustomerData(generateMockCustomerData());
            setSalesData(generateMockSalesData());
        };
        loadData();
    }, []);

    // Detect screen size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Consider it mobile if width is less than 768px
        };

        handleResize(); // Check on initial load
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Function to handle marking gallons out for delivery.
    const handleMarkOut = useCallback((id: string) => {
        setInOutData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, timeOut: new Date() } : item
            )
        );
    }, []);

    const handleAddCustomer = (newCustomer: CustomerData) => {
        setCustomerData(prevData => [...prevData, newCustomer]);
    };

    const handleAddInOut = (newInOut: InOutData) => {
        setInOutData(prevData => [...prevData, newInOut]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border border-blue-200/50">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-4 sm:mb-6 md:mb-8 text-center">
                    Golden Valley Water Station
                </h1>

                <Tabs defaultValue="inout" className="w-full">
                    <TabsList className="flex w-full mb-4 sm:mb-6 md:mb-8">
                        <TabsTrigger value="inout" className="flex-1 text-center px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
                            <ArrowRightLeft className="mr-2 h-4 w-4 inline" />
                            In/Out
                        </TabsTrigger>
                        <TabsTrigger value="customers" className="flex-1 text-center px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
                            <Users className="mr-2 h-4 w-4 inline" />
                            Customers
                        </TabsTrigger>
                        <TabsTrigger value="sales" className="flex-1 text-center px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
                            <ShoppingCart className="mr-2 h-4 w-4 inline" />
                            Sales
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="inout">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-blue-600">In/Out Transactions</h2>
                            <InOutForm onAddInOut={handleAddInOut} />
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Gallons</TableHead>
                                        <TableHead>Time In</TableHead>
                                        <TableHead>Time Out</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {inOutData.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.customerName}</TableCell>
                                            <TableCell>{item.gallonsOrdered}</TableCell>
                                            <TableCell>{formatTime(item.timeIn)}</TableCell>
                                            <TableCell>{formatTime(item.timeOut)}</TableCell>
                                            <TableCell>
                                                {item.timeOut ? (
                                                    <span className="text-green-500">Delivered</span>
                                                ) : (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleMarkOut(item.id)}
                                                        className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300"
                                                    >
                                                        Mark Out
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                    <TabsContent value="customers">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-blue-600">Customer Details</h2>
                            <CustomerForm onAddCustomer={handleAddCustomer} />
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Address</TableHead>
                                        <TableHead>Orders (Month)</TableHead>
                                        <TableHead>Remarks</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {customerData.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>{customer.name}</TableCell>
                                            <TableCell>{customer.address}</TableCell>
                                            <TableCell>{customer.ordersThisMonth}</TableCell>
                                            <TableCell>{customer.remarks}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                    <TabsContent value="sales">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-blue-600">Sales Overview</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-blue-100/80 p-4 rounded-lg shadow-md border border-blue-200/50">
                                    <h3 className="text-lg font-medium text-blue-700">Daily Sales</h3>
                                    <p className="text-xl text-gray-800">₱{salesData.day}</p>
                                </div>
                                <div className="bg-blue-100/80 p-4 rounded-lg shadow-md border border-blue-200/50">
                                    <h3 className="text-lg font-medium text-blue-700">Weekly Sales</h3>
                                    <p className="text-xl text-gray-800">₱{salesData.week}</p>
                                </div>
                                <div className="bg-blue-100/80 p-4 rounded-lg shadow-md border border-blue-200/50">
                                    <h3 className="text-lg font-medium text-blue-700">Monthly Sales</h3>
                                    <p className="text-xl text-gray-800">₱{salesData.month}</p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

const InOutForm = ({ onAddInOut }: { onAddInOut: (data: InOutData) => void }) => {
    const [customerName, setCustomerName] = useState('');
    const [gallonsOrdered, setGallonsOrdered] = useState<number | string>('');

    const handleAdd = () => {
        if (!customerName.trim() || !gallonsOrdered) {
            alert('Please fill in all fields.'); // Basic validation
            return;
        }
        const gallons = Number(gallonsOrdered);
        if (isNaN(gallons) || gallons <= 0) {
            alert('Please enter a valid number of gallons.');
            setGallonsOrdered('');
            return;
        }

        const newInOut: InOutData = {
            id: crypto.randomUUID(),
            customerName,
            gallonsOrdered: gallons,
            timeIn: new Date(),
        };
        onAddInOut(newInOut);
        setCustomerName('');
        setGallonsOrdered('');
    };

    return (
        <div className="bg-white/80 p-4 rounded-lg shadow-md border border-blue-200/50">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Add New Transaction</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
                    <Input
                        id="customerName"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter customer name"
                        className="mt-1 w-full border-blue-500 focus:ring-blue-500 placeholder-gray-400"
                    />
                </div>
                <div>
                    <label htmlFor="gallonsOrdered" className="block text-sm font-medium text-gray-700">Gallons Ordered</label>
                    <Input
                        id="gallonsOrdered"
                        type="text"
                        value={gallonsOrdered}
                        onChange={(e) => setGallonsOrdered(e.target.value)}
                        placeholder="Enter gallons"
                        className="mt-1 w-full border-blue-500 focus:ring-blue-500 placeholder-gray-400"
                    />
                </div>
            </div>
            <Button
                onClick={handleAdd}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
                Add Transaction
            </Button>
        </div>
    );
};

const CustomerForm = ({ onAddCustomer }: { onAddCustomer: (customer: CustomerData) => void }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [ordersThisMonth, setOrdersThisMonth] = useState<number | string>('');
    const [remarks, setRemarks] = useState('');

    const handleAdd = () => {
        if (!name.trim() || !address.trim() || !ordersThisMonth.toString().trim() || !remarks.trim()) {
            alert('Please fill in all fields.'); // Basic validation
            return;
        }

        const orders = Number(ordersThisMonth);
        if (isNaN(orders) || orders < 0) {
            alert('Please enter a valid number for orders.');
            setOrdersThisMonth('');
            return;
        }

        const newCustomer: CustomerData = {
            id: crypto.randomUUID(),
            name,
            address,
            ordersThisMonth: orders,
            remarks,
        };
        onAddCustomer(newCustomer);
        setName('');
        setAddress('');
        setOrdersThisMonth('');
        setRemarks('');
    };

    return (
        <div className="bg-white/80 p-4 rounded-lg shadow-md border border-blue-200/50">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Add New Customer</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <Input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address"
                        className="mt-1 w-full"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                    <label htmlFor="ordersThisMonth" className="block text-sm font-medium text-gray-700">Orders This Month</label>
                    <Input
                        id="ordersThisMonth"
                        type="text"
                        value={ordersThisMonth}
                        onChange={(e) => setOrdersThisMonth(e.target.value)}
                        placeholder="Enter orders"
                        className="mt-1 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                    <Input
                        id="remarks"
                        type="text"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Enter remarks"
                        className="mt-1 w-full"
                    />
                </div>
            </div>
            <Button
                onClick={handleAdd}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
                Add Customer
            </Button>
        </div>
    );
};

export default GoldenValleyApp;