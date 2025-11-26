import React from 'react';

export function LayoutDefault({ children, footer, header }: { children: React.ReactNode, footer?: React.ReactNode, header?: React.ReactNode }) {
    return (
        <div className="flex flex-col w-full">
            {header || <header className="w-full py-4 flex-shrink-0">
                <div className="flex justify-center items-center w-full">
                    <h1>「Loyalty Cards」</h1>
                </div>
            </header>}
            <main className="w-full flex-grow overflow-y-auto pb-32">
                {children}
            </main>
            <footer className="w-full flex-shrink-0 fixed bottom-0 left-0 right-0 bg-white p-4">
                {footer}
            </footer>
        </div>
    );
}
