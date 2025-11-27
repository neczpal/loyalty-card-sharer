import React from 'react';

/**
 * A layout for a modal dialog.
 * @param header The header text of the modal.
 * @param children The content of the modal.
 */
export function ModalLayout({header, children}: { header: string, children: React.ReactNode }) {
    return (
        <>
            <h2 className="text-2xl md:text-3xl font-bold text-center">
                {header}
            </h2>
            <section className="flex-grow h-full overflow-y-auto">
                {children}
            </section>
        </>
    );
}
