import React from 'react';

export function LayoutModal({ header, children }: { header: React.ReactNode, children: React.ReactNode }) {
    return (
        <>
            <h2 className="flex-shrink-0">
                {header}
            </h2>
            <section className="flex-grow overflow-y-auto">
                {children}
            </section>
        </>
    );
}
