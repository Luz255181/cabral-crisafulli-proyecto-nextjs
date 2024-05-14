-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "pedidoId" INTEGER,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "mail" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_mail_key" ON "User"("mail");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

