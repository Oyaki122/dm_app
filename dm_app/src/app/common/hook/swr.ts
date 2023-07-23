// import useSWR from 'swr';
import {ZodType} from 'zod';

export const fetcher = <U>(schama : ZodType<U>)=>
// eslint-disable-next-line no-undef
  async (input : RequestInfo | URL, init? : RequestInit) : Promise<U> => {
    let param = {};
    if (init === undefined) {
      param = {credentials: 'include'};
    } else {
      param = {...init, credentials: 'include'};
    }
    const data = await fetch(input, param);
    const json = await data.json();
    return schama.parse(json);
  };