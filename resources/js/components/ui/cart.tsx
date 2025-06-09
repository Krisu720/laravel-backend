import { MinusIcon, PlusIcon, Trash } from "lucide-react";
import { Group, Button as NumberButton, Input as AriaInput, NumberField } from "react-aria-components";
import { FaCartShopping } from "react-icons/fa6";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { Button } from "./button";
import useCartStore from "@/hooks/use-cart-store";
import { useStep } from "usehooks-ts";
import { Input } from "./input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { router, usePage } from "@inertiajs/react";
import { SharedData } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    phone: z.string().min(1, "Phone is required"),
    street: z.string().min(1, "Street is required"),
    postalCode: z.string().min(1, "Postal code is required").regex(/^\d{2}-\d{3}$/, "Invalid postal code format"),
    city: z.string().min(1, "City is required")
});

type FormData = z.infer<typeof formSchema>;

const Cart = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { auth } = usePage<SharedData>().props

    const { products, removeProduct, setQuantity, clearCart } = useCartStore()
    const [step, { canGoToPrevStep, canGoToNextStep, goToNextStep, goToPrevStep, reset }] = useStep(3)

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues, setValue
    } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    useEffect(() => {
        if (auth.user) {
            setValue("firstName", auth.user.name)
            // setValue("lastName", auth.user.lastName)
            setValue("email", auth.user.email)
        }
    }, [auth, setValue])

    const handleNextStep = () => {
        if (step === 2) {
            handleSubmit(() => {
                goToNextStep();
            })();
            return;
        }
        goToNextStep();
    };

    const createOrder = async () => {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        const mockOrder = new Promise((resolve) => {
            setTimeout(() => {
                axios.post('/api/orders', {
                    firstName: getValues('firstName'),
                    lastName: getValues('lastName'),
                    email: getValues('email'),
                    phone: getValues('phone'),
                    street: getValues('street'),
                    postalCode: getValues('postalCode'),
                    city: getValues('city'),
                    products: products.map(product => ({
                        id: product.id,
                        quantity: product.quantity
                    }))
                }, {
                    headers: {
                        'X-CSRF-TOKEN': token
                    }
                }).then(() => {
                    setIsLoading(false);
                    setIsOpen(false);
                    clearCart();
                    reset();
                    resolve(true);
                });
            }, 5000);
        });
        setIsLoading(true)

        toast.promise(mockOrder, {
            loading: "Creating order...",
            success: "Order placed. Go to the account tab to see your orders.",
            error: "Error while creating the order",
        })
    }

    const pages = [<></>, <div className="flex flex-col gap-4 px-4">
        {products.map(product => (
            <div className="rounded-xl border p-2 flex">
                <img className="size-25 rounded-xl object-contain" src={product.image ? "http://localhost:8000/storage/" + product.image : 'https://placehold.co/600x600'} />
                <div className="flex flex-col ml-2 my-auto">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-semibold line-clamp-1">{product.name}</h1>
                            <p className="text-lg">{product.price.toFixed(2)} zł</p>
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
                                <AriaInput className="bg-background text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
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
        {products.length < 1 && <p className="text-sm text-muted-foreground">The cart is empty</p>}
    </div>,
    <div className="flex flex-col gap-4 px-4">
        <h1 className="text-lg font-semibold">Personal data</h1>
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <Input
                        placeholder="First name"
                        {...register("firstName")}
                        className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Input
                        placeholder="Last name"
                        {...register("lastName")}
                        className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <Input
                    placeholder="Email"
                    {...register("email")}
                    className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <Input
                    placeholder="Phone"
                    {...register("phone")}
                    className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
        </div>

        <h1 className="text-lg font-semibold mt-4">Delivery address</h1>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Input
                    placeholder="Street and number"
                    {...register("street")}
                    className={errors.street ? 'border-red-500' : ''}
                />
                {errors.street && <p className="text-red-500 text-sm">{errors.street.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <Input
                        placeholder="Postal code"
                        {...register("postalCode")}
                        className={errors.postalCode ? 'border-red-500' : ''}
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Input
                        placeholder="City"
                        {...register("city")}
                        className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>
            </div>
        </div>
    </div>,
    <div className="flex flex-col gap-4 px-4">
        <h1 className="text-2xl font-semibold">Summary</h1>
        <div className="rounded-xl border p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                {products.map(product => (
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <img className="size-12 rounded-lg object-contain" src={product.image ? "http://localhost:8000/storage/" + product.image : 'https://placehold.co/600x600'} />
                            <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-muted-foreground">Quantity: {product.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold">{(product.price * product.quantity).toFixed(2)} zł</p>
                    </div>
                ))}
            </div>
            <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">Total</p>
                    <p className="text-lg font-semibold">{products.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2)} zł</p>
                </div>
            </div>
        </div>
    </div>
    ] as const

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <FaCartShopping className="size-6" />
                        {products.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white font-bold text-xs rounded-full size-4">{products.reduce((sum, product) => sum + product.quantity, 0)}</span>}
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Cart</SheetTitle>
                    </SheetHeader>

                    {!!auth.user ? <>
                        {pages[step]}
                        <SheetFooter className="flex flex-row">
                            {canGoToPrevStep && <Button variant="outline" className="flex-1" size="lg" onClick={goToPrevStep} disabled={isLoading}>Back</Button>}
                            <Button className="flex-1" size="lg" onClick={!canGoToNextStep ? createOrder : handleNextStep} disabled={isLoading || products.length < 1}>

                                {!canGoToNextStep ? "Place order" : "Next"}
                            </Button>
                        </SheetFooter>
                    </>
                        : <div className="flex flex-col gap-4 px-4">
                            <h1 className="text-lg font-semibold">You need to be logged in to place an order</h1>
                            <Button variant="outline" size="lg" onClick={() => router.visit('/login')}>Login</Button>
                        </div>}

                </SheetContent>
            </Sheet>
        </>
    )
}

export default Cart