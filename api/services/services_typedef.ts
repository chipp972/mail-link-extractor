import { Document, Model, Schema } from 'mongoose';

export interface ModelProps<T extends Document> {
  database: {
    model: (collectionName: string, sch: Schema) => Model<T>;
    Schema: any;
  };
}
