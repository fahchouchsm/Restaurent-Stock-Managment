import { ipcMain } from "electron";
import { cosResponse, cosResponseData, createCollectionData } from "../interfaces/requestsInt.js";
import database from "../classes/database.js";
import { dbCollection } from "../interfaces/databaseInt.js";


export const collectionHandler = () => {
    ipcMain.handle('createCollection', async (_event, data: createCollectionData): Promise<cosResponse> => {
        try {
            await database.createCollection(data)
            return { status: true, msg: 'Collection created successfully' }
        } catch (error) {
            console.error('❌ Error creating collection:', error);
            return { status: false, msg: 'Failed to create collection' };
        }
    })
    ipcMain.handle('getCollections', async (_event): Promise<cosResponseData<dbCollection[]>> => {
        try {
            const result = await database.getCollections();
            if (result.status) {
                return { status: true, data: result.data };
            } else {
                return { status: false, msg: result.msg || 'No collections found' };
            }
        } catch (error) {
            console.error('❌ Error fetching collections:', error);
            return { status: false, msg: 'Failed to fetch collections' };
        }
    })
}