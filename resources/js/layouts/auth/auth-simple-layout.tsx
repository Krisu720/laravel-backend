import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="bg-background flex min-h-svh w-screen">
            <div className='grid grid-cols-1 md:grid-cols-2 w-full'>

                <div className="w-full max-w-sm mx-auto my-auto ">
                    <div className="flex flex-col gap-8">
                        <Button variant="ghost" className='w-fit' onClick={() => router.visit(route('mainpage'))}>
                            <ArrowLeft /> Back
                        </Button>
                        <div className="flex flex-col items-center gap-4">
                            <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                                <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium">{title}</h1>
                                <p className="text-muted-foreground text-center text-sm">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>

                </div>
                <div className='bg-gray-200 hidden md:block'>

                </div>
            </div>

        </div>
    );
}
