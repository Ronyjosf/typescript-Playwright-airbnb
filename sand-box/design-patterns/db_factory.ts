// the idea with a factory, that you decouple connection implementation, from the usage.
// benefits of decoupling ( maintanance, resuable ), flexible to enhance in future
interface DatabaseConnector {
    connect(config: any): Promise<void>;
    query(sql: string): Promise<any[]>;
}
class MysqlConnector implements DatabaseConnector {
    connect(config: any): Promise<void> { return Promise.resolve(undefined);  }

    query(sql: string): Promise<any[]> { return Promise.resolve([]); }
    // ... implementation for MySQL connection and queries
}

class PostgresConnector implements DatabaseConnector {
    connect(config: any): Promise<void> {return Promise.resolve(undefined); }

    query(sql: string): Promise<any[]> {  return Promise.resolve([]);  }
}

class DatabaseConnectorFactory {
    static createConnector(databaseType: string): DatabaseConnector {
        switch (databaseType) {
            case "mysql":
                return new MysqlConnector();
            case "postgres":
                return new PostgresConnector();
            default:
                throw new Error(`Unsupported database type: ${databaseType}`);
        }
    }
}
// usage
let connector = DatabaseConnectorFactory.createConnector("postgres");