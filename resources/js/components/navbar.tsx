import { Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from "./ui/button";
import { TextEffect } from "./ui/text-effect";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { type SharedData } from "@/types";
import Cart from "./ui/cart";
import { Toaster } from "./ui/sonner";

const Navbar = () => {
    const { auth } = usePage<SharedData>().props;
    const cleanup = useMobileNavigation();

    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className="flex justify-between items-center py-4 px-6">
                <Button onClick={() => setIsOpen(true)} variant="ghost" size="icon">
                    <RxHamburgerMenu className="size-6" />
                </Button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(10px)' }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-white/95 py-4 z-50 px-6 flex flex-col">
                            <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon"> <X className="size-6" /></Button>
                            <div className="mt-12 flex flex-col gap-4">
                                <Link href="/" className="text-4xl md:text-8xl hover:bg-black hover:text-white">
                                    <TextEffect per='line' as='h3' preset='slide'>
                                        HOME
                                    </TextEffect>
                                </Link>
                                <Link href="/products" className="text-4xl md:text-8xl hover:bg-black hover:text-white">
                                    <TextEffect delay={0.1} per='line' as='h3' preset='slide'>
                                        PRODUCTS
                                    </TextEffect>
                                </Link>
                                {auth.user ? (
                                    <>
                                        <Link href="/konto" className="text-4xl md:text-8xl hover:bg-black hover:text-white">
                                            <TextEffect delay={0.2} per='line' as='h3' preset='slide'>
                                                ACCOUNT
                                            </TextEffect>
                                        </Link>
                                        <Link className="text-4xl md:text-8xl hover:bg-black hover:text-white text-start" method="post" href={route('logout')} as="button" onClick={cleanup}>
                                            <TextEffect delay={0.2} per='line' as='h3' preset='slide'>
                                                LOG OUT
                                            </TextEffect>
                                        </Link>
                                    </>
                                ) : <>
                                    <Link href="/login" className="text-4xl md:text-8xl hover:bg-black hover:text-white">
                                        <TextEffect delay={0.2} per='line' as='h3' preset='slide'>
                                            LOG IN
                                        </TextEffect>

                                    </Link>
                                    <Link href="/register" className="text-4xl md:text-8xl hover:bg-black hover:text-white">
                                        <TextEffect delay={0.2} per='line' as='h3' preset='slide'>
                                            REGISTER
                                        </TextEffect>
                                    </Link>
                                </>}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Link href="/" className="text-3xl tracking-widest ">Monsieur</Link>
                <Cart />
            </div>
            <Toaster position='bottom-center' />
        </>

    )
}

export default Navbar;
