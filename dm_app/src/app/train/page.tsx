'use client';
import TrainCard from './trainCard';

import {TrainsSchema} from '@/app/common/types/trains';

import {
  Heading,
} from '@/app/common/components';
import {fetcher} from '@/app/common/hook/swr';
import useSWR from 'swr';
import {StationSchema} from '../common/types/stations';


export default function TrainPage() {
  const {data: trainObj, error: trainError} = useSWR(
    'http://user.keio.ac.jp/~ub622319/dm_app2//api/train_details', fetcher(TrainsSchema));
  // const train = trainObj?.trains;

  const {data: stationsObj, error: stationError} = useSWR(
    'http://user.keio.ac.jp/~ub622319/dm_app2//api/get_stations', fetcher(StationSchema));
  const stations = stationsObj?.stations;

  const trains = trainObj?.trains;

  console.log(trainError, stationError);
  console.log(trains);

  return <>
    <Heading as="h2" size="lg">列車管理</Heading>

    {trains?.map((train) => {
      const url = `/train/detail?slug=${train.train_id}`;
      console.log(url);
      return (

        <TrainCard key={train.train_id} num={train.train_id} destination={
          stations?.find(e=> e.station_id === train.destinaion)?.name ?? ''}
        origin={stations?.find(e=>e.station_id === train.origin)?.name ?? ''} />
      );
    })}
  </>;


}