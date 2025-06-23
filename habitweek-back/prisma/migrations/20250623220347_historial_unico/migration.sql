/*
  Warnings:

  - A unique constraint covering the columns `[habitoId,fecha]` on the table `Historial` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Historial_habitoId_fecha_key" ON "Historial"("habitoId", "fecha");
