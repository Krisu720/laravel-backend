import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { FormEvent } from 'react'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OrderItem {
  id: number;
  product_name: string;
  product_price: number;
  quantity: number;
}

interface Order {
  id: number;
  status: string;
  street: string;
  city: string;
  postal_code: string;
  phone: string;
  email: string;
  note: string;
  created_at: string | null;
  updated_at: string | null;
  user_id: number;
  items: OrderItem[];
}

const Account = ({ orders }: { orders: Order[] }) => {
  const { auth } = usePage<SharedData>().props
  const { data, setData, put, processing, reset, errors } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updatePassword = (e: FormEvent) => {
    e.preventDefault();
    put(route('password.update'), {
      onSuccess: () => {
        reset('password', 'password_confirmation');
        alert('Password has been changed successfully!');
      },
    });
  };

  return (
    <AppLayout>
      <div className='container mt-6'>
        <div className='mb-6 flex flex-wrap items-center gap-x-4 gap-y-2'>

          <h1 className='text-2xl font-bold md:text-3xl'>
            Welcome {auth.user.name}!
          </h1>
          <Link className={cn(buttonVariants({size:"sm",className:"ml-2",variant:"link"}))} method="post" href={route('logout')} as="button" >
            Log out
          </Link>
        </div>

        <div className="space-y-8">
          {/* Password change form */}
          <div className='w-full md:w-1/3'>
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={updatePassword} className="space-y-4">
              <div>
                <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <Input
                  type="password"
                  id="current_password"
                  value={data.current_password}
                  onChange={e => setData('current_password', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.current_password && (
                  <p className="mt-1 text-sm text-red-600">{errors.current_password}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <Input
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  id="password_confirmation"
                  value={data.password_confirmation}
                  onChange={e => setData('password_confirmation', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <Button
                type="submit"
                disabled={processing}
              >
                {processing ? 'Saving...' : 'Change Password'}
              </Button>

            </form>
          </div>

          {/* Order list */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">You have no orders yet.</p>
            ) : (
              <div className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <div key={order.id} className="py-4">
                    <div className="flex flex-col gap-2 bg-gray-100 p-4 md:flex-row md:items-start md:justify-between">
                      <div className=''>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.created_at && format(new Date(order.created_at), 'dd.MM.yyyy')}</p>
                        <p className="text-sm text-gray-600">{order.street}, {order.postal_code} {order.city}</p>
                        <p className="text-sm text-gray-600">Email: {order.email}</p>
                        <p className="text-sm text-gray-600">Phone: {order.phone}</p>
                      </div>
                      <span className="px-3 py-1 text-sm rounded-full bg-green-500 text-white font-bold">
                        {order.status}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                        <h4 className="font-semibold">Products:</h4>
                        <p className="font-semibold sm:text-end">Total: {order.items.reduce((acc, item) => acc + item.product_price * item.quantity, 0).toFixed(2)} zł</p>
                      </div>
                      <ul className="list-disc list-inside mt-2">
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {item.product_name} - {item.quantity} pcs.
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Account