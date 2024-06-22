'use client';

import { Categoria, ProductForm } from '@/app/lib/definitions';
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditForm({
  product,
  category,
}: {
  product: ProductForm;
  category: Categoria[];
}) {
  const router = useRouter()
  const [formValues, setFormValues] = useState({
    id: product.id,
    name: product.nombre,
    amount: product.precio,
    categoryId: product.categoria,
    description: product.descripcion,
    imageURL: product.fotoURL,
    action: 'EDIT'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    // Append other form values to formData
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    try {
      const response = await fetch('/lib/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 409) {
          console.log(response.statusText)
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();

      if (data.success) {
        setImageUrl(data.product.imageUrl);
        router.push('/dashboard/admin');
      } else {
        console.error('Error uploading image:', data.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Product Name */}
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Insertar el nombre del producto
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={product.nombre}
            required
            onChange={handleInputChange}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Elegir el precio
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="amount"
              name="amount"
              type="number"
              defaultValue={product.precio}
              step="0.01"
              placeholder="Ingrese el precio en $"
              required
              onChange={handleInputChange}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="categoryId" className="mb-2 block text-sm font-medium">
            Elegir una categoría
          </label>
          <div className="relative">
            <select
              id="categoryId"
              name="categoryId"
              required
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={product.categoria}
              onChange={handleInputChange}
              aria-describedby="category-error"
            >
              <option value="" disabled>
                Seleccionar Categoría
              </option>
              {category.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Description */}
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Insertar una descripción del producto
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="description"
            name="description"
            type="text"
            required
            defaultValue={product.descripcion}
            onChange={handleInputChange}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>

        {/* Foto url */}
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Foto actual
        </label>
        <div className="mt-6 flex justify-center gap-4">
          <Image
            src={product.fotoURL}
            alt={`${product.nombre}`}
            className="w-64 h-64 object-contain"
            width={200}
            height={200}
          />
        </div>
        <label htmlFor="file" className="mb-2 block text-lg font-medium">
          Insertar la foto nueva
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="file"
            type="file"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0] || null;
              setFile(selectedFile);
            }}
            accept="image/x-png,image/gif,image/jpeg"
            className="block w-full text-sm text-gray-500 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        {/* Form Actions */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/admin"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </Link>
          <Button type="submit" className="flex h-10 items-center rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-600">
            Editar Producto
          </Button>
        </div>
      </div>
    </form>
  );
}
