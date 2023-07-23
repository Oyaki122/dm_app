'use client';

import {Heading,
  Box,
  FormControl,
  FormLabel,
  Select,
} from '../common/components';
import {ScheduleTable, ScheduleTableRow} from '../common/components/table';

import {useState} from 'react';
import useSWR from 'swr';
import {fetcher} from '../common/hook/swr';
import {DriverSchema} from '../common/types/drivers';
import {DriverScheduleSchema} from '../common/types/driverSchedule';


export default function Driver() {

  const {data: driversObj, error: driverError} = useSWR(
    'http://user.keio.ac.jp/~ub622319/dm_app2//api/get_drivers', fetcher(DriverSchema));
  const [driverId, setDriverId] = useState<number>(0);
  const drivers = driversObj?.drivers;

  const {data: scheduleObj, error: scheduleError} = useSWR(
    `http://user.keio.ac.jp/~ub622319/dm_app2//api/get_driver_schedule/${driverId}`,
    fetcher(DriverScheduleSchema));

  const schedule = scheduleObj?.schedules;

  return (
    driverError || scheduleError ?
      <>
        <p> {driverError.toString()}</p>
        <p>{scheduleError.toString()}</p></> :
      <>
        <Heading as="h2" size="lg"
        >運転手スケジュール</Heading>
        <Box p="1rem">
          <FormControl>
            <FormLabel>運転手</FormLabel>
            <Select
              variant='outline'
              // placeholder='運転手'
              value={driverId ?? ''}
              onChange={e => setDriverId(parseInt(e.target.value, 10))}
              // onChange={e=>console.log(parseInt(e.target.value, 10))}
            >
              <option value={0}>運転士を選択</option>
              {
                drivers?.map(e =>{
                  return <option key={e.driver_id} value={e.driver_id}>{e.name}</option>;
                })
              }
            </Select>
          </FormControl>
        </Box>
        <Box p="1rem">
          <ScheduleTable indexes={['列車番号', '駅', '到着時刻', '出発時刻']}>
            {
              schedule?.map((e, i)=>
                <ScheduleTableRow key={i} element={[
                  e.train_id.toString(),
                  e.name,
                  e.arrival_time?.toString() ?? '-',
                  e.departure_time?.toString() ?? '-'
                ]} />
              )
            }
          </ScheduleTable>
        </Box>
      </>);
}
