///<reference path='d.ts/DefinitelyTyped/node/node.d.ts' />

declare module "mongoose" {

    module mongoose {

        export class Mongoose {
            constructor();

            mongo: any;
            version: string;
            connection: Connection;

            set (key: string, value: string): Mongoose;
            get (key: string): string;
            createConnection(uri?: string, options?: any): Connection;
            connect(...args: any[]): Mongoose;

            disconnect(fn: (err?: any) => void ): Mongoose;
            model(name: string, schema?: Schema, collection?: string, skipInit?: boolean): Model<any>;
            modelNames(): string[];
            plugin(fn: (...args: any[]) => any, opts?: any): Mongoose;

        }

        export var mongo: any;
        export var version: string;
        export var connection: Connection;

        export function set (key: string, value: string): Mongoose;
        export function get (key: string): string;
        export function createConnection(uri?: string, options?: any): Connection;
        export function connect(...args: any[]): Mongoose;

        export function disconnect(fn: (err?: any) => void ): Mongoose;
        export function model(name: string, schema?: Object, collection?: string, skipInit?: boolean): Model<any>;
        export function modelNames(): string[];
        export function plugin(fn: (schema: Schema, options?: Object) => void, opts?: any): Mongoose;

        export class Collection {
            name: string;
        }

        export class Connection implements EventEmitter {
            constructor(base: Mongoose);

            addListener(event: string, listener: Function): void;
            on(event: string, listener: Function): void;
            once(event: string, listener: Function): void;
            removeListener(event: string, listener: Function): void;
            removeAllListeners(event?: string): void;
            setMaxListeners(n: number): void;
            listeners(event: string): Function[];
            emit(event: string, arg1?: any, arg2?: any): void;

            open(connection_string: string,
                 database?: string,
                 port?: number,
                 options?: any,
                 callback?: (err: any, db?: any) => void): Connection;

            openSet(uris: string,
                    database?: string,
                    options?: any,
                    callback?: (err: any, db?: any) => void): Connection;

            close(callback?: Function): Connection;
            collection(name: string, options?: any): Collection;
            model(name: string, schema?: Schema, collection?: string): Model<any>;
            modelNames(): string[];
            setProfiling(level: number, ms: number, callback: Function): any;
            db: any;
            collections: any;
            readyState: number;
        }

        export class Schema {
            constructor(definition: any, options?: any);

            static Types: {
                ObjectId: any;
                Mixed: any;
            };

            methods: any;
            statics: any;
            path(path: string): any;
            virtual(path: string): any;
            pre(method: string, callback: (next: () => void) => void): void;
        }

        export class SchemaType { }

        export class VirtualType { }

        export class Query<T extends Document> {
            exec(): Promise;
            exec(operation: string): Promise;
            exec(callback: (err: any, res: T[]) => any): Promise;
            exec(operation: string, callback: (err: any, res: T[]) => void ): Promise;

            skip(x: number): Query<any>;
            limit(x: number): Query<any>;
        }

        export class Promise { }

        export interface Model<T extends Document> {
            new (doc: any): Document;

            find(conditions: any): Query<T>;
            find(conditions: any, fields: any): Query<T>;
            find(conditions: any, fields: any, options: any): Query<T>;
            find(conditions: any, fields: any, options: any, callback: (err: any, res: any) => void ): Query<T>;
            find(conditions: any, callback: (err: any, res: T[]) => void ): Query<T>;
            find(conditions: any, fields: any, callback: (err: any, res: T[]) => void ): Query<T>;

            findOne(conditions: any): Query<T>;
            findOne(conditions: any, fields: any): Query<T>;
            findOne(conditions: any, fields: any, options: any): Query<T>;
            findOne(conditions: any, fields: any, options: any, callback: (err: any, res: T) => void ): Query<T>;
            findOne(conditions: any, callback: (err: any, res: T) => void ): Query<T>;
            findOne(conditions: any, fields: any, callback: (err: any, res: T) => void ): Query<T>;

            findById(id: string): Query<T>;
            findById(id: string, fields: any): Query<T>;
            findById(id: string, fields: any, options: any): Query<T>;
            findById(id: string, fields: any, options: any, callback: (err: any, res: T) => void ): Query<T>;
            findById(id: string, callback: (err: any, res: T) => void ): Query<T>;
            findById(id: string, fields: any, callback: (err: any, res: T) => void ): Query<T>;

            findByIdAndUpdate(id: string): Query<T>;
            findByIdAndUpdate(id: string, update: any): Query<T>;
            findByIdAndUpdate(id: string, update: any, options: any): Query<T>;
            findByIdAndUpdate(id: string, update: any, options: any, callback: (err: any, res: T[]) => void ): Query<T>;
            findByIdAndUpdate(id: string, callback: (err: any, res: T[]) => void ): Query<T>;
            findByIdAndUpdate(id: string, update: any, callback: (err: any, res: T[]) => void ): Query<T>;

            update(conditions: any,
                   update: any,
                   options?: any,
                   callback?: (err: any, affectedRows: number, raw: any) => void ): Query<T>;
            update(conditions: any,
                   update: any,
                   callback?: (err: any, affectedRows: number, raw: any) => void ): Query<T>;

            create(doc: any, fn: (err: any, res: T) => void ): void;

            collection: Collection;

            remove(conditions: any, callback?: (err: any) => void): Query<T>;
        }

        export interface Document {
            _id: string;
            update<T extends Document>(doc: any, options: any, callback: (err: any, affectedRows: number, raw: any) => void ): Query<T>;
            save<T extends Document>(fn?: (err: any, res: T) => void ): void;
            remove<T extends Document>(callback?: (err: any) => void ): Query<T>;
        }

        interface MongooseError extends Error { }
        interface CastError extends MongooseError { }
        interface DocumentError extends MongooseError { }
        interface ValidationError extends MongooseError {
            errors: MongooseError[];
        }
        interface ValidatorError extends MongooseError { }
        interface VersionError extends MongooseError { }
        interface OverwriteModelError extends MongooseError { }
        interface MissingSchemaError extends MongooseError { }
        interface DivergentArrayError extends MongooseError { }

        export var Error: {
            new (message?: string): MongooseError;

            CastError: {
                new (type: any, value: any, path: string): CastError;
            }
            DocumentError: {
                new (message?: string): DocumentError;
            }
            ValidationError: {
                new (instance: Object): ValidationError;
            }
            ValidatorError: {
                new (path: string, msg?: string, val?: any): ValidatorError;
            }
            VersionError: {
                new (): VersionError;
            }
            OverwriteModelError: {
                new (name: string): OverwriteModelError;
            }
            MissingSchemaError: {
                new (name: string): MissingSchemaError;
            }
            DivergentArrayError: {
                new (paths: string[]): DivergentArrayError;
            }
        }

        export class Types { }

        export class SchemaTypes { }
    }

    export = mongoose;
}