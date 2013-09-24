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
            pre(method: string, callback: Function): Schema;
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
            new (doc?: any): T;
            db: any;
            collection: Collection;
            modelName: string;
            schema: Schema;
            base: Mongoose;

            find(conditions: any, fields?: any, options?: any, callback?: (err: any, res: any) => void ): Query<T>;
            find(conditions: any, fields: any, callback: (err: any, res: T[]) => void ): Query<T>;
            find(conditions: any, callback: (err: any, res: T[]) => void ): Query<T>;

            findOne(conditions: any, fields?: any, options?: any, callback?: (err: any, res: T) => void ): Query<T>;
            findOne(conditions: any, fields: any, callback: (err: any, res: T) => void ): Query<T>;
            findOne(conditions: any, callback: (err: any, res: T) => void ): Query<T>;

            findById(id: string, fields?: any, options?: any, callback?: (err: any, res: T) => void ): Query<T>;
            findById(id: string, fields: any, callback: (err: any, res: T) => void ): Query<T>;
            findById(id: string, callback: (err: any, res: T) => void ): Query<T>;

            findByIdAndUpdate(id: string, update?: any, options?: any, callback?: (err: any, res: T[]) => void ): Query<T>;
            findByIdAndUpdate(id: string, update: any, callback: (err: any, res: T[]) => void ): Query<T>;
            findByIdAndUpdate(id: string, callback: (err: any, res: T[]) => void ): Query<T>;

            findByIdAndRemove(id: any, options?: Object, callback?: (err: any) => void): Query<T>;
            findByIdAndRemove(id: any, callback: (err: any) => void): Query<T>;

            findOneAndUpdate(conditions?: Object, update?: Object, options?: Object, callback?: (err: any, doc: any) => void): Query<T>;
            findOneAndUpdate(conditions: Object, update: Object, callback: (err: any, doc: any) => void): Query<T>;

            findOneAndRemove(conditions: Object, options?: Object, callback?: (err: any) => void): Query<T>;
            findOneAndRemove(conditions: Object, callback: (err: any) => void): Query<T>;

            update(conditions: Object, update: Object, options?: Object, callback?: (err: any, affectedRows?: number, raw?: any) => void): Query<T>;
            update(conditions: Object, update: Object, callback: (err: any, affectedRows?: number, raw?: any) => void): Query<T>;

            distinct(field: string, conditions?: Object, callback?: (err: any, result: any) => void): Query<T>;
            distinct(field: string, callback: (err: any, result: any) => void): Query<T>;

            where(path: string, val?: Object): Query<T>;
            $where(argument: string): Query<T>;
            $where(argument: (err: any, docs: any) => void): Query<T>;

            aggregate(array: Object[], options?: Object, callback?: (err: any, res: any) => void): any;
            aggregate(array: Object[], callback: (err: any, res: any) => void): any;

            populate(doc: Object, options: Object, callback: (err: any, doc: any) => void): void;
            populate(docs: Object[], options: Object, callback: (err: any, docs: Object[]) => void): void;

            create(doc: any, fn: (err: any, res: T) => void): void;
            remove(conditions: any, callback?: (err: any) => void): Query<T>;
            increment(): Model<T>;
            ensureIndexes(cb?: (err: any) => void): void;
            count(conditions?: Object, callback?: (err: any, count: any) => void): Query<T>;
            mapReduce(o: Object, callback: (err: any, model: Model, stats: any) => void): void;
        }

        export interface Document {
            schema: Schema;
            isNew: boolean;
            id: string;
            errors: Object;
            update<T extends Document>(update: Object, options?: Object, callback?: (err: any, affectedRows?: number, raw?: any) => void): Query<T>;
            update<T extends Document>(update: Object, callback: (err: any, affectedRows?: number, raw?: any) => void): Query<T>;
            save<T extends Document>(callback: (err: any, res?: T) => void): Query<T>;
            remove<T extends Document>(callback: (err: any) => void): Query<T>;
            set(path: any, val: any, type?: SchemaTypes, options?: Object): Document;
            set(path: any, val: any, options: Object): Document;
            get(path: string, type?: SchemaTypes): any;
            markModified(path: string): void;
            modifiedPaths(): string[];
            isModified(path?: string): boolean;
            isDirectModified(path: string): boolean;
            isInit(path: string):boolean;
            isSelected(path: string): boolean;
            validate(cb: (err: any) => void): Document;
            invalidate(path: string, err: any, value?: any): void;
            toObject(options?: Object): any;
            toJSON(options?: Object): any;
            inspect(options?: Object): any;
            toString(): string;
            equals(doc: Document): boolean;
            populate(path?: string, callback?: (err: any, doc: any) => void): Document;
            populate(options: Object, callback?: (err: any, doc: any) => void): Document;
            populated(path: string): any;
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
