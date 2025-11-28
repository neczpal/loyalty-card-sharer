import React from 'react';

/**
 * The default layout for the application.
 * @param children The main content of the page.
 * @param footer The footer content of the page.
 * @param header The header content of the page.
 */
export function DefaultLayout({children, footer, header}: {
    children: React.ReactNode,
    footer?: React.ReactNode,
    header?: React.ReactNode
}) {
    return (<div className="w-full flex flex-col h-dvh items-center">
            {header || <header className="w-full py-6 md:py-8 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-center items-center w-full">
                    <h1 className="text-5xl font-semibold">「LoyaltyCards」</h1>
                </div>
            </header>}
            <main className="w-full flex-grow overflow-y-auto pb-16 flex flex-col max-w-[724px] px-4 md:px-12">
                {children}
            </main>
            {footer && (<footer
                className="w-full border-t border-gray-200 dark:border-gray-700 flex-shrink-0 fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4">
                {footer}
            </footer>)
            }
        </div>
    );
}
