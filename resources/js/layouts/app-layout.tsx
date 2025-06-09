import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: AppLayoutProps) => (
    <>
        <div {...props}>
            <Navbar />
            {children}
            <Footer/>
        </div>
    </>
);
