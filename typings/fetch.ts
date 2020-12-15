import type {
  RequestInit as NodeRequestInit,
  Response as NodeResponse,
} from "node-fetch";
import type { Primitive } from "typings/types";

export type FetchData = {
  [key: string]: Primitive | FetchData | undefined;
};

export type QueryString = {
  qs?: FetchData;
};

interface FetchOptions extends QueryString, Omit<RequestInit, "body"> {
  body?: RequestInit["body"] | Record<string, unknown>;
}

interface NodeFetchOptions extends QueryString, Omit<NodeRequestInit, "body"> {
  body?: NodeRequestInit["body"] | Record<string, unknown>;
}

export type FetchResponse = Response | NodeResponse;
export type FetchRequestInit = FetchOptions | NodeFetchOptions;

export interface FetchRequest {
  endpoint: string;
  options: FetchRequestInit;
  data?: FetchData & QueryString;
}

// export type FetchResponse<T> = T extends Response ? Response : NodeResponse;
// export type FetchRequestInit<T> = T extends RequestInit
//   ? FetchOptions
//   : NodeFetchOptions;

// export interface FetchRequest<T> {
//   endpoint: string;
//   options: FetchRequestInit<T>;
//   data?: FetchData & QueryString;
// }

// export interface FetchURL {
//   endpoint: string;
//   // qs?: QuesryString;
// }
