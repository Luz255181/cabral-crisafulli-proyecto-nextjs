import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { PrismaClient } from '@prisma/client'
import Image from 'next/image';

export default async function SideNav() {
  const prisma = new PrismaClient()
  const logo = await prisma.fotos.findFirst({
    where: {
      nombre: 'Logo',
    },
  })
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <a className="mb-2 flex h-20 items-end justify-start rounded-md bg-purple-400 p-4 md:h-40">
        <Image src={logo?.fotoURL}
          alt="Katty"
          width={283}
          height={283}
          className='w-40'
        />
      </a>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 hover:text-purple-400 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}