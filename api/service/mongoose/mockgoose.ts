import { Mockgoose } from 'mock-mongoose';
import mongoose, { Connection, ConnectionOptions } from 'mongoose';

export default async function initMockgoose(uri: string, options?: ConnectionOptions): Promise<Connection> {
  const mockgoose: Mockgoose = new Mockgoose(mongoose);
  await mockgoose.prepareStorage();
  const mockDb: Connection = await mongoose.createConnection(uri, options);
  return mockDb;
}
