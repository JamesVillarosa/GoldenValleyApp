import React, { useState, createContext, useContext } from 'react';

// Create a context to hold the active tab and the setter function
const TabsContext = createContext<{ activeTab: string; setActiveTab: (value: string) => void } | undefined>(undefined);

// Top-level Tabs component
export const Tabs = ({ children, defaultValue }: { children: React.ReactNode; defaultValue: string }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    // Use a context provider to pass values to children
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div>
                {children}
            </div>
        </TabsContext.Provider>
    );
};

// List of tabs
export const TabsList = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex space-x-4">{children}</div>;
};

// Individual tab trigger
export const TabsTrigger = ({
    value,
    children,
}: {
    value: string;
    children: React.ReactNode;
}) => {
    // Use the context to get activeTab and setActiveTab
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error("TabsTrigger must be used within a Tabs component");
    }
    const { activeTab, setActiveTab } = context;

    return (
        <button
            onClick={() => setActiveTab(value)}
            className={`px-4 py-2 rounded-md ${
                activeTab === value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
        >
            {children}
        </button>
    );
};

// Tab content
export const TabsContent = ({
    value,
    children,
}: {
    value: string;
    children: React.ReactNode;
}) => {
    // Use the context to get activeTab
      const context = useContext(TabsContext);
      if (!context) {
        throw new Error("TabsContent must be used within a Tabs component");
    }
    const { activeTab } = context;
    return activeTab === value ? <div className="mt-4">{children}</div> : null;
};
