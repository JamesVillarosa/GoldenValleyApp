import React from 'react';

export const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            className={`px-4 py-2 rounded-md font-medium ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};