CREATE DATABASE "RetailDataVis";

CREATE TABLE "RetailData"(
    "InvoiceNo" VARCHAR(15),
    "StockCode" VARCHAR(15),
    "Description" VARCHAR(100),
    "Quantity" INTEGER,
    "InvoiceDate" VARCHAR(50),
    "UnitPrice" NUMERIC,
    "CustomerID" CHAR(15),
    "Country" VARCHAR(100)
);

COPY "RetailData" FROM 'C:\OnlineRetail.csv' DELIMITER ',' CSV HEADER;

CREATE TYPE "userRole" AS ENUM('SuperAdmin', 'InventoryManager', 'Finance', 'Customer');
CREATE TABLE "Users"(
    "Email" VARCHAR(50),
    "Password" VARCHAR(50),
    "Role" "userRole"
);

-- DON'T PASTE THIS YET

-- CREATE TABLE "Items"(
--     "StockCode" VARCHAR(15) PRIMARY KEY,
--     "Description" VARCHAR(100)
-- );

-- CREATE TABLE "Customers"(
--     "CustomerID" VARCHAR(15) PRIMARY KEY,
--     "Country" VARCHAR(100)
-- );

-- CREATE TABLE "Orders"(
--     "InvoiceNo" VARCHAR(15) PRIMARY KEY,
--     "InvoiceDate" VARCHAR(50),
--     "Quantity" NUMERIC,
--     "UnitPrice" NUMERIC,
--     "StockCode" VARCHAR(15) REFERENCES "Items",
--     "CustomerID" VARCHAR(15) REFERENCES "Customers"
-- );

-- INSERT INTO "Items" SELECT DISTINCT "StockCode", "Description" FROM "RetailData" WHERE "Description" IS NOT NULL AND "Description" != 'damages' AND "Description" != 'damaged' AND "Description" != 'check';
-- INSERT INTO "Items" SELECT DISTINCT "StockCode", "Description" FROM "RetailData" WHERE "Description" IS NOT NULL AND LENGTH("Description") > 20;
-- SELECT DISTINCT "StockCode", "Description", COUNT(*) FROM "RetailData" GROUP BY "StockCode", "Description" HAVING COUNT(*) > 1 ORDER BY "StockCode";
