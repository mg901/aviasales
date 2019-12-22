const API_ROOT = "https://front-test.beta.aviasales.ru/";

type Request = <T>(method: string, url: string, data?: any) => Promise<T>;

const request: Request = async (method, url, data) => {
  const options: RequestInit = {
    method: method.toUpperCase()
  };

  if (data) options.body = JSON.stringify(data);

  const x = await fetch(`${API_ROOT}${url}`, options);

  return x.json();
};

export const get = <T>(url: string) => request<T>("get", url);
export const post = <T>(url: string, body: any) =>
  request<T>("post", url, body);

export const put = <T>(url: string, body: any) => request<T>("put", url, body);
export const del = <T>(url: string) => request<T>("del", url);
