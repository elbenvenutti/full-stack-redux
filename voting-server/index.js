import makeStore from './src/store';
import {startServer} from './src/server.js';

export const store = makeStore();
startServer(store);
