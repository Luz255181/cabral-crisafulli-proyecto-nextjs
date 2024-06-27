'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout, vaciarCarrito } from '@/redux/features/carrito/carritoSlice';
import { selectTotalItemsInCarrito } from '@/redux/features/carrito/selectors';
import { ShoppingCartIcon, HomeIcon, ShoppingBagIcon, ArrowLeftOnRectangleIcon, PowerIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function NavLinks() {
  const pathname = usePathname();
  const logueado = useAppSelector((state) => state.log);
  const totalItemsInCarrito = useAppSelector(selectTotalItemsInCarrito);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(vaciarCarrito());
    router.push('/dashboard/productos');
  };

  const links = [
    {
      name: 'Sobre mi',
      href: '/',
      icon: HomeIcon,
    },
    {
      name: 'Productos',
      href: logueado ? '/dashboard/admin' : '/dashboard/productos',
      icon: ShoppingBagIcon,
    },
    // Solo agregar el carrito si no está logueado
    ...(!logueado
      ? [{
          name: 'Carrito',
          href: '/dashboard/carrito',
          icon: ShoppingCartIcon,
        }]
      : []),
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 hover:text-purple-400 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-purple-100 text-purple-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
            {link.name === 'Carrito' && totalItemsInCarrito > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {totalItemsInCarrito}
              </span>
            )}
          </Link>
        );
      })}

      {logueado ? (
        <button
          onClick={handleLogout}
          className={clsx(
            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 hover:text-purple-400 md:flex-none md:justify-start md:p-2 md:px-3',
          )}
        >
          <PowerIcon className="w-6" />
          <p className="hidden md:block">Cerrar sesión</p>
        </button>
      ) : (
        <>
          <Link
            href="/dashboard/login"
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 hover:text-purple-400 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-purple-100 text-purple-600': pathname === '/dashboard/login',
              },
            )}
          >
            <ArrowLeftOnRectangleIcon className="w-6" />
            <p className="hidden md:block">Iniciar sesión</p>
          </Link>
          <Link
            href="/dashboard/usuario/crear"
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 hover:text-purple-400 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-purple-100 text-purple-600': pathname === '/dashboard/usuario/crear',
              },
            )}
          >
            <UserCircleIcon className="w-6" />
            <p className="hidden md:block">Crear Usuario</p>
          </Link>
        </>
      )}
    </>
  );
}