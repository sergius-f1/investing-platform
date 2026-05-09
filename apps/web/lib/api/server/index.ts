import {
    CONTENT_TYPE_EVENT_STREAM,
    CONTENT_TYPE_JSON,
    HEADER_AUTHORIZATION,
    HEADER_CACHE_CONTROL,
    HEADER_CONNECTION,
    HEADER_CONTENT_TYPE,
} from "@/lib/api/constants";

type RequestBody = Record<string, unknown>;

const SERVER_API_URL = process.env.SERVER_API_URL;
const SERVER_API_TOKEN = process.env.SERVER_API_TOKEN;

const getUrl = (path: string): string => {
    if (!SERVER_API_URL) {
        throw new Error('SERVER_API_URL is not defined');
    }
    return `${SERVER_API_URL}${path}`;
};

const getAuthHeaders = (): Record<string, string> => ({
    [HEADER_AUTHORIZATION]: `Bearer ${SERVER_API_TOKEN}`,
});

const request = async <T>(path: string, init?: RequestInit): Promise<T | undefined> => {
    const url = getUrl(path);
    try {
        const res = await fetch(url, {
            ...init,
            headers: {
                ...getAuthHeaders(),
                ...(init?.headers as Record<string, string>),
            },
        });
        if (!res.ok) {
            console.error(`${init?.method ?? 'GET'} ${path} failed: ${res.status}`);
            return undefined;
        }
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

const get = <T>(path: string): Promise<T | undefined> =>
    request<T>(path);

const post = <T>(path: string, body: RequestBody): Promise<T | undefined> =>
    request<T>(path, {
        method: 'POST',
        headers: { [HEADER_CONTENT_TYPE]: CONTENT_TYPE_JSON },
        body: JSON.stringify(body),
    });

const sse = async (path: string): Promise<Response> => {
    const upstream = await fetch(getUrl(path), { headers: getAuthHeaders() });
    return new Response(upstream.body, {
        headers: {
            [HEADER_CONTENT_TYPE]: CONTENT_TYPE_EVENT_STREAM,
            [HEADER_CACHE_CONTROL]: 'no-cache',
            [HEADER_CONNECTION]: 'keep-alive',
        },
    });
};

export const httpClient = { get, post, sse };
