// import useSWR from 'swr';
import {ZodType} from 'zod';

export const fetcher = <U>(schama : ZodType<U>)=>
// eslint-disable-next-line no-undef
  async (input : RequestInfo | URL, init? : RequestInit) : Promise<U> => {
    const data = await fetch(input, init);
    const json = await data.json();
    return schama.parse(json);
  };