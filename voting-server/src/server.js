import Server from 'socket.io';

export const startServer = (store) => {
    const io = new Server().attach(8090);

    store.subscribe(() => io.emit('state', store.getState().toJS()));
};
