# Loyalty Card Sharer

A mobile-first, backend-less web application for storing and sharing loyalty cards.

Can be tried [here](http://neczpal.github.io/loyalty-card-sharer/dist)

## Features

*   **Local Storage:** Loyalty cards are stored locally in your browser.
*   **Card Display:** Cards are displayed as tiles. Clicking on a tile shows the QR or barcode for scanning in-store.
*   **Search:** A search bar appears when you have more than four cards, allowing you to filter them.
*   **Edit Mode:**
    *   Add new loyalty cards by entering the card code, format (barcode/QR), store name, and an optional color for easy identification.
    *   Delete and reorder cards.
    *   Edit existing cards.
*   **Sharing:**
    *   Create a shareable link for one of your card or your entire loyalty card collection.
    *   When someone opens the link, they can choose to merge the shared collection with their existing cards, overwrite their collection, or cancel the import.

## Key Dependencies

*   **React:** For building the user interface.
*   **Tailwind CSS:** For styling the application.
*   **Lodash:** A modern JavaScript utility library.
*   **lz-string:** For compressing and decompressing strings, used for sharing.
*   **React Movable:** For reordering the card list.
