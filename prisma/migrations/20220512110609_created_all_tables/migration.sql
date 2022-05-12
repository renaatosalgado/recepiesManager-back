-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measures" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recepies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "servingPortion" INTEGER NOT NULL,
    "method" TEXT NOT NULL,

    CONSTRAINT "recepies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredientsRecepies" (
    "id" SERIAL NOT NULL,
    "recepieId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "measureId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ingredientsRecepies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");

-- CreateIndex
CREATE UNIQUE INDEX "measures_name_key" ON "measures"("name");

-- CreateIndex
CREATE UNIQUE INDEX "recepies_name_key" ON "recepies"("name");

-- AddForeignKey
ALTER TABLE "recepies" ADD CONSTRAINT "recepies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredientsRecepies" ADD CONSTRAINT "ingredientsRecepies_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredientsRecepies" ADD CONSTRAINT "ingredientsRecepies_measureId_fkey" FOREIGN KEY ("measureId") REFERENCES "measures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredientsRecepies" ADD CONSTRAINT "ingredientsRecepies_recepieId_fkey" FOREIGN KEY ("recepieId") REFERENCES "recepies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
