import useCartStore from "@/hooks/use-cart-store";
import { Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { MinusIcon, PlusIcon, Trash, X } from "lucide-react";
import { useState } from "react";
import { Group, Input, Button as NumberButton, NumberField } from "react-aria-components";
import { FaCartShopping } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { TextEffect } from "./ui/text-effect";
const Navbar = () => {

    const { products, removeProduct, setQuantity } = useCartStore()


    const [isOpen, setIsOpen] = useState(false)
    return (
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
                            <Link href="/mainpage" className="text-8xl hover:bg-black hover:text-white">
                                <TextEffect per='line' as='h3' preset='slide'>
                                    STRONA GŁÓWNA
                                </TextEffect>
                            </Link>
                            <Link href="/" className="text-8xl hover:bg-black hover:text-white">
                                <TextEffect delay={0.1}  per='line' as='h3' preset='slide'>
                                    PRODUKTY
                                </TextEffect>
                            </Link>
                            <Link href="/account" className="text-8xl hover:bg-black hover:text-white">
                                <TextEffect delay={0.2} per='line' as='h3' preset='slide'>
                                    KONTO
                                </TextEffect>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Link href="/" className="text-3xl tracking-widest ">Monsieur</Link>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <FaCartShopping className="size-6" />
                        {products.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white font-bold text-xs rounded-full size-4">{products.length}</span>}
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Koszyk</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 p-2">
                        {products.map(product => (
                            <div className="rounded-xl border p-2 flex">
                                <img className="size-25 rounded-xl object-contain" src={product.image ? "http://localhost:8000/storage/" + product.image : 'https://placehold.co/600x600'} />
                                <div className="flex flex-col ml-2 my-auto">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <h1 className="text-xl font-semibold">{product.name}</h1>
                                            <p className="text-lg">{product.price} zł</p>
                                        </div>
                                        <Button onClick={() => removeProduct(product)} size="icon" variant="ghost" className="hover:bg-destructive/10 hover:text-red-500 transition-none cursor-pointer">
                                            <Trash className="size-6" />
                                        </Button>
                                    </div>
                                    <div className="mt-2">
                                        <NumberField defaultValue={product.quantity} minValue={1} onChange={v => setQuantity(product, v)}>
                                            <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
                                                <NumberButton
                                                    slot="decrement"
                                                    className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <MinusIcon size={16} aria-hidden="true" />
                                                </NumberButton>
                                                <Input className="bg-background text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
                                                <NumberButton
                                                    slot="increment"
                                                    className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <PlusIcon size={16} aria-hidden="true" />
                                                </NumberButton>
                                            </Group>
                                        </NumberField>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <SheetFooter>
                        <Button size="lg">Zamów</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Navbar;
