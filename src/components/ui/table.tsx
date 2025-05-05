import React from 'react';

export const Table = ({ children }: { children: React.ReactNode }) => (
    <table className="min-w-full border-collapse border border-gray-200">{children}</table>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-gray-100">{children}</thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
    <tbody>{children}</tbody>
);

export const TableRow = ({ children }: { children: React.ReactNode }) => (
    <tr className="border-b border-gray-200">{children}</tr>
);

export const TableHead = ({ children }: { children: React.ReactNode }) => (
    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">{children}</th>
);

export const TableCell = ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-2 text-sm text-gray-600">{children}</td>
);