import type { FetchRequest, FetchResponse, QueryString } from "typings/fetch";

const browser = typeof window !== "undefined";

export function url(endpoint: string, { qs }: QueryString): string {
  const origin = browser ? window.location.origin
// : "http://php/api/v2/";
   : "http://shakespeare-admissions.med.uottawa.ca/admissions/api/v2/";

  const url = new URL(`${origin}${endpoint}`);

  if (qs) {
    for (const [key, value] of Object.entries(qs)) {
      url.searchParams.append(key, String(value));
    }
  }

  return url.toString();
}

export const request = async <T>({
  endpoint,
  options,
}: FetchRequest): Promise<T> => {
  const fetch = browser ? window.fetch : require("node-fetch").default;

  const { qs, body } = options;

  if (typeof qs !== undefined || typeof body !== undefined) {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json; charset=utf-8",
    };

    if (body) {
      options.body = JSON.stringify(body);
    }
  }

  const text = await fetch(url(endpoint, { qs }), options)
    .then((response: FetchResponse) => response.text())
    .catch(console.error);

  try {
    return JSON.parse(text);
  } catch (_error) {
    return text;
  }
};

export const get = async <T>(
  endpoint: FetchRequest["endpoint"],
  qs?: FetchRequest["data"],
  options?: FetchRequest["options"]
): Promise<T> =>
  request({
    endpoint,
    options: { method: "GET", qs, ...options },
    // data: { qs:  },
  });

export const post = async <T>(
  endpoint: FetchRequest["endpoint"],
  data: FetchRequest["data"],
  options?: FetchRequest["options"]
): Promise<T> =>
  request({ endpoint, options: { method: "POST", ...options, body: data } });

export const del = async <T>(
  endpoint: FetchRequest["endpoint"],
  options?: FetchRequest["options"]
): Promise<T> =>
  request({ endpoint, options: { method: "DELETE", ...options } });

export const put = async <T>(
  endpoint: FetchRequest["endpoint"],
  data: FetchRequest["data"],
  options?: FetchRequest["options"]
): Promise<T> => request({ endpoint, options: { method: "PUT", ...options } });

export default {
  get,
  post,
  put,
  del,
};
