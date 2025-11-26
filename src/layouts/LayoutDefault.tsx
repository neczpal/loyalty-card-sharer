import React from 'react';

export function LayoutDefault({ children, footer, header }: { children: React.ReactNode, footer?: React.ReactNode, header?: React.ReactNode }) {
    return (<>
            {header || <header className="w-full py-4 flex-shrink-0">
                <div className="flex justify-center items-center w-full">
                    <h1 className="text-4xl md:text-5xl font-semibold">「LoyaltyCards」</h1>
                </div>
            </header>}
            <main className="w-full flex-grow overflow-y-auto pb-32 px-4 md:px-12 max-w-[1024px]">
                {children}
            </main>
            {footer && (<footer
                className="w-full border-t border-gray-200 dark:border-gray-700  flex-shrink-0 fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4">
                {footer}
            </footer>)
            }
        </>
    );
}
