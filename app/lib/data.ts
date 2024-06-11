'use sever'

import { PrismaClient } from '@prisma/client'
import { Categoria } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { ProductForm } from './definitions';
import { sql } from '@vercel/postgres';

const ITEMS_PER_PAGE = 6;

export async function getPhotoEmprendedor() {
    const prisma = new PrismaClient()
    const foto = await prisma.fotos.findFirst({
        where: {
            nombre: 'Foto_Emprendedor',
        },
    })
    await prisma.$disconnect()
    return foto
}

export async function getLogo() {
    const prisma = new PrismaClient()
    const logo = await prisma.fotos.findFirst({
        where: {
            nombre: 'Logo',
        },
    })
    await prisma.$disconnect()
    return logo
}

export async function getProduct(query: string, page: number) {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const prisma = new PrismaClient()
    const producto = await prisma.producto.findMany({
        skip: offset,
        take: ITEMS_PER_PAGE,
        where: {
            nombre: {
                contains: query,
                mode: 'insensitive',
            }
        }
    })
    await prisma.$disconnect()
    return producto
}

export async function getProductCart(idProduct: number) {
    const prisma = new PrismaClient()
    const producto = await prisma.producto.findFirst({
        where: {
            id: idProduct,
        }
    })
    await prisma.$disconnect()
    return producto
}

export async function fetchProductPages(query: string) {
    const prisma = new PrismaClient()
    const producto = await prisma.producto.findMany({
        where: {
            nombre: {
                contains: query,
            }
        }
    })
    const totalPages = Math.ceil(Number(producto.length) / ITEMS_PER_PAGE);
    await prisma.$disconnect()
    return totalPages;
}

export async function fetchProductById(id: string) {
    noStore();
    try {
      const data = await sql<ProductForm>`
        
      `;
  
      const product = data.rows.map((product) => ({
        ...product,
        // Convert amount from cents to dollars
        price: product.precio / 100,
      }));
  
      console.log(product); // Invoice is an empty array []
      return product[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch invoice.');
    }
  }

  export async function fetchUsers() {
    const prisma = new PrismaClient()

    return await prisma.user.findMany()

    await prisma.$disconnect()
  }

export async function insertProduct(query: string, price: number, description: string, category: Categoria, url: string) {
    const prisma = new PrismaClient()
    const nuevoProducto = await prisma.producto.create({
        data: {
            nombre: query,
            descripcion: description,
            precio: price,
            categoria: category,
            fotoURL: url,
        },
    });
    await prisma.$disconnect()
}

export async function removeProduct(id2: number) {
    const prisma = new PrismaClient()
    const productoBorrado = await prisma.producto.delete({
        where: {
            id: id2,
        },
    });
    await prisma.$disconnect()
}

export async function catchUpProduct(id2: number) {
    const prisma = new PrismaClient()
    
    await prisma.$disconnect()
}