# HOW TO RUN:
### Step 1
    npm install
### Step 2
    create a '.env' file and paste this providing your db password:

    PG_USER=postgres
    PG_PASSWORD=<postgres_password>
    PG_HOST=localhost
    PG_DATABASE=RetailDataVis
    PG_PORT=5432

### Step 3
[Download CSV](https://drive.google.com/file/d/0XSKHxmSWrv_Z-XsPusw90DNNh_Q30IZ1/view?usp=sharing)
Place the CSV file at the root of your drive.
Create tables in the postgres db
Postgres includes a commandline a shell called 'psql'.
Search for psql in your computer search bar and press enter until prompted for password.
Enter this command: 
         
    CREATE DATABASE RetailDataVis;
    \c retaildatavis 

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


    psql command reference:
        \l                    - show all databases
        ctrl + C              - exit
        \c <database_name>    - connect to a database
        \dt                   - display all tables in a database
### Step 4
    npm start

### Step 5
Open this link
<http://localhost:5000/>