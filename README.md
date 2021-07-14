#HOW TO RUN:
###Step 1
    ######npm install
###Step 2
    create a '.env' file and paste this providing your db password:

    ######PG_USER=postgres
    ######PG_PASSWORD=<postgres_password>
    ######PG_HOST=localhost
    ######PG_DATABASE=5432
    ######PG_PORT=RetailDataVis
###Step 3
    create tables in the postgres db
    postgres includes a commandline a shell called 'psql'.
    search for psql in your computer search bar and press enter until prompted for password.
    enter this command: 
         
        #####CREATE DATABASE RetailDataVis;
        #####\c retaildatavis 
    copy and paste all table creation commands in ######database/sql_commands.sql


    psql COMMANDS:
        \l                    - show all databases
        ctrl + C              - exit
        \c <database_name>    - connect to a database
        \dt                   - display all tables in a database
###Step 4
    ######npm start