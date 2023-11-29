import { Background } from "./Background";
import React, { ReactNode } from "react";

type PageLayoutProps = {
    children: ReactNode;
};
export const PageLayout: React.FC<PageLayoutProps> = ({children}) => (
        <main className="bg-gray-900 relative isolate min-h-screen">
            <Background />
            {children}
        </main>
);

