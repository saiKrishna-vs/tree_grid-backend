-- CreateTable
CREATE TABLE "OPT_Party" (
    "PTY_ID" UUID NOT NULL DEFAULT gen_random_uuid(),
    "PTY_FirstName" VARCHAR(100) NOT NULL,
    "PTY_LastName" VARCHAR(100) NOT NULL,
    "PTY_Phone" VARCHAR(20),
    "PTY_SSN" VARCHAR(20),
    "PTY_Gender" VARCHAR(20),
    "PTY_Age" INTEGER,

    CONSTRAINT "OPT_Party_pkey" PRIMARY KEY ("PTY_ID")
);

-- CreateIndex
CREATE INDEX "OPT_Party_PTY_Gender_idx" ON "OPT_Party"("PTY_Gender");

-- CreateIndex
CREATE INDEX "OPT_Party_PTY_Age_idx" ON "OPT_Party"("PTY_Age");
