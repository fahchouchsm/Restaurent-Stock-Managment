import sqlite3 from "sqlite3";
import path from "path";
import { app } from "electron";
import chalk from "chalk";
import { cosResponseData, createCollectionData } from "../interfaces/requestsInt.js";
import { dbCollection } from "../interfaces/databaseInt.js";

const DB_PATH = path.join(app.getPath("userData"), "restaurant-stock.db");

class Database {
    public db!: sqlite3.Database;

    constructor() {
        console.log('🔹DB path :' + DB_PATH);
        console.log('🔹', app.getPath('userData'));

        this.connect();
    }

    private connect(): void {
        this.db = new sqlite3.Database(DB_PATH, (err) => {
            if (err) {
                console.error(chalk.red("❌ Failed to connect to database:"), err.message);
            } else {
                console.log(chalk.green("✅ Connected to database at:"), DB_PATH);
                this.initializeDatabase();
            }
        });
    }

    public testConnection(): void {
        this.db.get("SELECT 1", (err) => {
            if (err) {
                console.error(chalk.red("❌ Database connection test failed:"), err.message);
                this.reconnect();
            } else {
                console.log(chalk.blue("🔹 Database connection is active."));
            }
        });
    }

    private reconnect(): void {
        console.log(chalk.yellow("⚠️ Attempting to reconnect to the database..."));

        this.db.close((err) => {
            if (err) {
                console.error(chalk.red("❌ Failed to close the database connection:"), err.message);
                return;
            }
            this.connect();
        });
    }

    private initializeDatabase(): void {
        console.log(chalk.blue("🔧 Initializing database..."));

        this.db.serialize(() => {
            this.db.run(`
        CREATE TABLE IF NOT EXISTS collections (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          color TEXT NOT NULL DEFAULT '#03a9f4'
        )
      `);

            this.db.run(`
        CREATE TABLE IF NOT EXISTS stockItems (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 0,
          unit TEXT NOT NULL,
          threshold INTEGER NOT NULL DEFAULT 0,
          collectionId INTEGER,  -- Directly linking to collections
          FOREIGN KEY (collectionId) REFERENCES collections(id) ON DELETE SET NULL
        )
      `);

            this.db.run(`
        CREATE TABLE IF NOT EXISTS meals (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          ingredients TEXT NOT NULL
        )
      `);

            this.db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT CHECK(type IN ('add', 'consume', 'loss')) NOT NULL,
          name TEXT NOT NULL,
          stockItemId INTEGER NOT NULL,
          ingredients TEXT,
          quantity INTEGER NOT NULL DEFAULT 0,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (stockItemId) REFERENCES stockItems(id) ON DELETE CASCADE
        )
      `);
        });

        console.log(chalk.green("✅ Database tables ensured."));
    }

    // Collection methods
    public createCollection(data: createCollectionData): void {
        this.db.run(
            `INSERT INTO collections (name, description, color) VALUES (?, ?, ?)`,
            [data.name, data.description, data.color],
            function (err) {
                if (err) {
                    console.error(chalk.red("❌ Error inserting collection:"), err.message);
                } else {
                    console.log(chalk.green(`✅ Collection "${data.name}" added successfully with ID: ${this.lastID}`));
                }
            }
        );
    }
    public getCollections(): Promise<cosResponseData<dbCollection[]>> {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM collections", (err, rows: dbCollection[]) => {
                if (err) {
                    console.error("❌ Error fetching collections:", err.message);
                    return reject({ status: false, msg: err.message });
                }
                console.log("✅ Collections:", rows);
                resolve({ status: true, data: rows });
            });
        });
    }




}

const database = new Database();
export default database;
