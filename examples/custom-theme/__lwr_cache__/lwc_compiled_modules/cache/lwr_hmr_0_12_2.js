import { updateStaleModule } from './util/swap';

// This is a workaround until we don't change the way HMR works
// The server will always return the same canonical "latest URL"
// So we need to track the last new URI instead
const URI_MAPPING = new Map();

async function moduleUpdate(payload) {
    const {
        oldUri,
        newUri,
        module: { specifier },
    } = payload;

    const lastEvalutedUri = URI_MAPPING.get(oldUri) || oldUri;
    const oldModule = await import(lastEvalutedUri);
    const newModule = await import(newUri);
    URI_MAPPING.set(oldUri, newUri);

    updateStaleModule({
        oldModule,
        newModule,
        specifier,
    });
}

function viewUpdate(payload, metadata) {
    const viewId = payload.viewId;
    const assetId = payload.assetId;

    // eslint-disable-next-line no-undef
    if (metadata.templates.includes(viewId) || metadata.assetReferences.includes(assetId)) {
        window.location.reload();
    }
}

async function waitForSuccessfulPing(socketUrl) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        try {
            // Fetching for the socket URL reject with a network error if not available. If the dev
            // server comes back online, it resolve with 404 HTTP response.
            await fetch(`http://${socketUrl}`);
            break;
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 1_000));
        }
    }
}

export function initHMR(serverURI = '', metadata) {
    const normalizedMeta = {
        ...{ assetReferences: [], templates: [] },
        ...metadata,
    };

    // {apiVersion}/hmr/{format}/{compat}?debug
    const host = serverURI.startsWith('/') ? location.host : '';
    const socketUrl = `${host}${serverURI}`;

    const socket = new WebSocket(`ws://${socketUrl}`);

    socket.addEventListener('close', async (evt) => {
        // Don't do anything is the socket close event was initiated by the client.
        if (evt.wasClean) {
            return;
        }

        // Otherwise wait until the server comes back online and reload the page.
        console.log('Lost connection with server, start polling...');
        await waitForSuccessfulPing(socketUrl);
        location.reload();
    });

    socket.addEventListener('message', async ({ data }) => {
        const { eventType, payload } = JSON.parse(data);

        switch (eventType) {
            case 'moduleUpdate':
                return moduleUpdate(payload);
            case 'viewUpdate':
                return viewUpdate(payload, normalizedMeta);
            default:
                return;
        }
    });
}
