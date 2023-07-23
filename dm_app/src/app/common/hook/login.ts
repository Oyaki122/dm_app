import useSWR from 'swr';

// import {fetcher} from './swr';

class FetchError extends Error {
  info: any;
  status?: number;
}

const fetcher = async (url : string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new FetchError('An error occurred while fetching the data.');
    // エラーオブジェクトに追加情報を付与します。
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};
export default function useUser() {
  const {data, mutate, error} = useSWR('http://localhost:5000/api/user', fetcher);

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate
  };
}