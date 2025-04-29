import { FaCartShopping } from "react-icons/fa6";
import { Button } from "./ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { MinusIcon, PlusIcon } from "lucide-react"
import { Button as NumberButton, Group, Input, Label, NumberField } from "react-aria-components"
import { Trash } from "lucide-react";
import useCartStore from "@/hooks/use-cart-store";
import { Link } from "@inertiajs/react";
const Navbar = () => {

    const { products, removeProduct, setQuantity } = useCartStore()

    return (
        <div className="flex justify-between items-center py-4 px-6">
            <Button variant="ghost" size="icon">
                <RxHamburgerMenu className="size-6" />
            </Button>
            <Link href="/" className="text-3xl ">Sklep internetowy</Link>
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
                                <img className="size-25 rounded-xl" src={product.image ? "http://localhost:8000/storage/" + product.image : 'https://placehold.co/600x600'} />
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
                                        <NumberField defaultValue={product.quantity} minValue={1} onChange={v=>setQuantity(product, v)}>
                                            <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
                                                <NumberButton
                                                    slot="decrement"
                                                    className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <MinusIcon size={16} aria-hidden="true" />
                                                </NumberButton>
                                                <Input  className="bg-background text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
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
