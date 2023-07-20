'use client';

import {fetcher} from '../common/hook/swr';
import {StationSchema} from '../common/types/stations';
import {StationScheduleSchema} from '../common/types/stationSchedule';
import useSWR from 'swr';

import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Select,

} from '../common/components';
import {ScheduleTable, ScheduleTableRow} from '../common/components/table';

import {useState} from 'react';


export default function Station() {
  const {data: stationsObj, error: stationError} = useSWR(
    'http://localhost:5000/api/get_stations', fetcher(StationSchema));
  const stations = stationsObj?.stations;

  const [stationId, setStationId] = useState<number>(0);

  const {data: scheduleObj, error: scheduleError} = useSWR(
    `http://localhost:5000/api/get_schedule_by_station/${stationId}`, fetcher(StationScheduleSchema));
  const schedule = scheduleObj?.schedules;


  return (
    stationError != null || scheduleError != null ?
      <>
        <p> {stationError?.toString()}</p>
        <p>{scheduleError?.toString()}</p></> :
      <>
        <Heading as="h2" size="lg"
        >駅時刻表</Heading>
        <Box p="1rem">
          <FormControl>
            <FormLabel>駅選択</FormLabel>
            <Select
              variant='outline'
              value={stationId ?? ''}
              onChange={e => setStationId(parseInt(e.target.value, 10))}
            >
              <option value={0}>駅を選択</option>
              {
                stations?.map(e =>{
                  return <option key={e.station_id} value={e.station_id}>{e.name}</option>;
                })
              }
            </Select>
          </FormControl>
        </Box>
        <Box p="1rem">
          <ScheduleTable indexes={['行き先', '出発時刻']}>
            {
              schedule?.map((e, i)=>
                <ScheduleTableRow key={i} element={[
                  e.destination,
                  e.departure_time.toString(),
                ]} />
              )
            }
          </ScheduleTable>
        </Box>
      </>);

}