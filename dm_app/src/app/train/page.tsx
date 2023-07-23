'use client';

import {fetcher} from '../common/hook/swr';
import useSWR from 'swr';

import {
  Heading,
  Box,
  Flex
} from '../common/components';


import {TrainsSchema} from '../common/types/trains';
import {StationSchema} from '../common/types/stations';
import TrainCard from './trainCard';


export default function Train() {
  const {data: stationsObj, error: stationError} = useSWR(
    'http://localhost:5000/api/get_stations', fetcher(StationSchema));
  const stations = stationsObj?.stations;

  // const [stationId, setStationId] = useState<number>(0);

  // const {data: scheduleObj, error: scheduleError} = useSWR(
  //   `http://localhost:5000/api/get_schedule_by_station/${stationId}`, fetcher(StationScheduleSchema));
  // const schedule = scheduleObj?.schedules;

  const {data: trainObj, error: trainError} = useSWR(
    'http://localhost:5000/api/train_details', fetcher(TrainsSchema));

  const trainArray = trainObj?.trains.map((e, i)=> {
    return {
      num: e.train_id,
      destination: stations?.find(f=>f.station_id === e.destinaion)?.name ?? '',
      origin: stations?.find(f=>f.station_id === e.origin)?.name ?? ''
    };
  });

  return (
    <>
      <Heading as="h2" size="lg">列車管理</Heading>
      <Flex p="1rem" direction={'row'} wrap={'wrap'}>
        {trainArray?.map((e, i)=>
          <Box p="0.5rem" key={i} flexGrow={1}>
            <TrainCard key={i} num={e.num} destination={e.destination ?? ''} origin={e.origin ?? ''} />
          </Box>)}
      </Flex>
    </>);

}