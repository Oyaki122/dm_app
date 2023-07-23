'use client';

import {TrainSchema} from '@/app/common/types/train';
import {StationSchema} from '@/app/common/types/stations';
import {CrewRangeSchema} from '@/app/common/types/crewRange';
import {DriverSchema} from '@/app/common/types/drivers';
import {StopsSchema} from '@/app/common/types/stops';

import {
  Box,
  Heading,
  HStack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Spacer,
} from '@/app/common/components';

import {fetcher} from '@/app/common/hook/swr';
import useSWR from 'swr';

import {ScheduleTable, ScheduleTableRow} from '@/app/common/components/table';

import Link from 'next/link';


export default function TrainDetail() {
  const params = {
    slug: ''};
  if (typeof window !== 'undefined') {
    params.slug = new URLSearchParams(new URL(window.location.href).search).get('slug') ?? '';
  }
  const {data: trainObj, error: trainError} = useSWR(
    'http://user.keio.ac.jp/~ub622319/dm_app2//api/train_detail/' + params.slug, fetcher(TrainSchema));
  const {data: stationsObj, error: stationError} = useSWR(
    'http://user.keio.ac.jp/~ub622319/dm_app2//api/get_stations', fetcher(StationSchema));
  const stations = stationsObj?.stations;

  const train = {
    num: trainObj?.train.train_id,
    destination: stations?.find(f=>f.station_id === trainObj?.train.destinaion)?.name ?? '',
    origin: stations?.find(f=>f.station_id === trainObj?.train.origin)?.name ?? ''
  };

  const {data: driversObj, error: driverError} = useSWR(
    'http://user.keio.ac.jp/~ub622319/dm_app2//api/get_drivers', fetcher(DriverSchema));
  const drivers = driversObj?.drivers;

  const {data: crewRangeObj, error: crewRangeError} = useSWR(
    `http://user.keio.ac.jp/~ub622319/dm_app2//api/crewRange/${trainObj?.train.train_id}`, fetcher(CrewRangeSchema));
  const crewRange = crewRangeObj?.range.map((e, i)=> {
    return {
      station: stations?.find(f=>f.station_id === e.station_id)?.name ?? '',
      driver: drivers?.find(f=>f.driver_id === e.driver_id)?.name ?? '',
    };
  });

  const {data: stopsObj, error: stopsError} = useSWR(
    `http://user.keio.ac.jp/~ub622319/dm_app2//api/stops/${trainObj?.train.train_id}`, fetcher(StopsSchema));

  const stops = stopsObj?.stops.map((e, i)=> {
    return {
      station: stations?.find(f=>f.station_id === e.station_id)?.name ?? '',
      arrival: e.arrival_time,
      departure: e.departure_time,
    };
  });


  console.log(trainError, stationError, driverError, crewRangeError, stopsError);

  return (
    <>
      {/* <Heading as="h2" size="lg">列車管理</Heading> */}
      <HStack p="1rem" spacing="1rem">
        <Box p="1rem">
          <Heading as="h3" size="md">列車番号: {trainObj?.train.train_id}</Heading>
        </Box>
        <Box p="1rem">
          <Text>出発: {train.origin}</Text>
          <Text>到着: {train.destination}</Text>
        </Box>
        <Spacer />
        <Box>
          <Link href={`/train/edit?slug=${trainObj?.train.train_id}`}>
            <Button colorScheme="green">
            編集</Button></Link>
        </Box>

      </HStack>
      <Box p="1rem">
        <Tabs>
          <TabList>
            <Tab>停車駅</Tab>
            <Tab>乗務員</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ScheduleTable indexes={['駅', '到着時間', '出発時間']}>
                {
                  stops?.map((e, i)=>
                    <ScheduleTableRow key={i} element={[e.station, e.arrival?.toString() ?? '-', e.departure?.toString() ?? '-']} />)
                }
              </ScheduleTable>
            </TabPanel>
            <TabPanel>
              <ScheduleTable indexes={['駅', '運転手']}>
                {
                  crewRange?.map((e, i)=>
                    <ScheduleTableRow key={i} element={[e.station, e.driver]} />)
                }
              </ScheduleTable>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}