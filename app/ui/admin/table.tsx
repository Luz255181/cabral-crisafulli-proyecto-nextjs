import { ShoppingCartIcon, PlusIcon } from '@heroicons/react/24/outline';
import { getProduct } from '@/app/lib/data';
import { UpdateProduct, DeleteProduct, CreateProduct } from '@/app/ui/buttons';

export default async function ProductTableAdmin({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const producto = getProduct(query, currentPage);
    return (
        <div className="bg-white px-6">
            <div className="flex space-x-4">
                <CreateProduct></CreateProduct>
                </div>
            {(await producto).map((product) => {
                return (
                    <div key={product.id} className="border border-gray-400 rounded-lg mb-4">
                        <div className="grid grid-cols-2">
                            <div className='p-4'>
                                <p className="text-lg font-bold mb-2">{product.nombre}</p>
                                <p className="text-gray-600 mb-2">{product.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                                <p className="mb-4">{product.descripcion}</p>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                    <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center w-full sm:w-auto">
                                        <ShoppingCartIcon className="h-5 w-5 mr-2" /> Añadir al carrito
                                    </button>
                                </div>
                                <div className="flex space-x-4">
                                    <UpdateProduct id={product.id} />
                                    <DeleteProduct id={product.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}