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
import { usePage } from "@inertiajs/react";
import { SharedData } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
    firstName: z.string().min(1, "Imię jest wymagane"),
    lastName: z.string().min(1, "Nazwisko jest wymagane"),
    email: z.string().min(1, "Email jest wymagany").email("Nieprawidłowy format email"),
    phone: z.string().min(1, "Telefon jest wymagany"),
    street: z.string().min(1, "Ulica jest wymagana"),
    postalCode: z.string().min(1, "Kod pocztowy jest wymagany").regex(/^\d{2}-\d{3}$/, "Nieprawidłowy format kodu pocztowego"),
    city: z.string().min(1, "Miasto jest wymagane")
});

type FormData = z.infer<typeof formSchema>;

const Cart = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { auth } = usePage<SharedData>().props

    const { products, removeProduct, setQuantity,clearCart } = useCartStore()
    const [step, { canGoToPrevStep, canGoToNextStep, goToNextStep, goToPrevStep ,reset}] = useStep(3)

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
        const mockOrder = new Promise((resolve) => {
        // taki obiekt do zrobienia zamówienia    z.object({
        //         firstName: z.string().min(1, "Imię jest wymagane"),
        //         lastName: z.string().min(1, "Nazwisko jest wymagane"),
        //         email: z.string().min(1, "Email jest wymagany").email("Nieprawidłowy format email"),
        //         phone: z.string().min(1, "Telefon jest wymagany"),
        //         street: z.string().min(1, "Ulica jest wymagana"),
        //         postalCode: z.string().min(1, "Kod pocztowy jest wymagany").regex(/^\d{2}-\d{3}$/, "Nieprawidłowy format kodu pocztowego"),
        //         city: z.string().min(1, "Miasto jest wymagane")
        //     });
            setTimeout(() => {
                resolve(true)
                setIsLoading(false)
                setIsOpen(false)
                clearCart()
                reset()
            }, 4000)
        })
        console.log(getValues())
        setIsLoading(true)

        toast.promise(mockOrder, {
            loading: "Tworzenie zamówienia...",
            success: "Zamówienie złożone. Przejdź na zakładke konto, aby zobaczyć swoje zamówienia.",
            error: "Błąd podczas tworzenia zamówienia",
        })

    }

    const pages = [<></>, <div className="flex flex-col gap-4 px-4">
        {products.map(product => (
            <div className="rounded-xl border p-2 flex">
                <img className="size-25 rounded-xl object-contain" src={product.image ? "http://localhost:8000/storage/" + product.image : 'https://placehold.co/600x600'} />
                <div className="flex flex-col ml-2 my-auto">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-semibold">{product.name}</h1>
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
        {products.length < 1 && <p className="text-sm text-muted-foreground">Koszyk jest pusty</p>}
    </div>,
    <div className="flex flex-col gap-4 px-4">
        <h1 className="text-lg font-semibold">Dane osobowe</h1>
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <Input
                        placeholder="Imię"
                        {...register("firstName")}
                        className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Input
                        placeholder="Nazwisko"
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
                    placeholder="Telefon"
                    {...register("phone")}
                    className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
        </div>

        <h1 className="text-lg font-semibold mt-4">Adres dostawy</h1>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Input
                    placeholder="Ulica i numer"
                    {...register("street")}
                    className={errors.street ? 'border-red-500' : ''}
                />
                {errors.street && <p className="text-red-500 text-sm">{errors.street.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <Input
                        placeholder="Kod pocztowy"
                        {...register("postalCode")}
                        className={errors.postalCode ? 'border-red-500' : ''}
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <Input
                        placeholder="Miasto"
                        {...register("city")}
                        className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>
            </div>
        </div>
    </div>,
    <div className="flex flex-col gap-4 px-4">
        <h1 className="text-2xl font-semibold">Podsumowanie</h1>
        <div className="rounded-xl border p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                {products.map(product => (
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <img className="size-12 rounded-lg object-contain" src={product.image ? "http://localhost:8000/storage/" + product.image : 'https://placehold.co/600x600'} />
                            <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-muted-foreground">Ilość: {product.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold">{(product.price * product.quantity).toFixed(2)} zł</p>
                    </div>
                ))}
            </div>
            <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">Suma</p>
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
                        <SheetTitle>Koszyk</SheetTitle>
                    </SheetHeader>
                    {pages[step]}
                    <SheetFooter className="flex flex-row">
                        {canGoToPrevStep && <Button variant="outline" className="flex-1" size="lg" onClick={goToPrevStep} disabled={isLoading}>Wstecz</Button>}
                        <Button className="flex-1" size="lg" onClick={!canGoToNextStep ? createOrder : handleNextStep} disabled={isLoading || products.length < 1}>
                            
                            {!canGoToNextStep ? "Złóż zamówienie" : "Dalej"}
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default Cart