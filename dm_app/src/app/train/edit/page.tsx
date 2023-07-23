'use client';

import {TrainSchema} from '@/app/common/types/train';
import {StationSchema} from '@/app/common/types/stations';
import {CrewRangeSchema} from '@/app/common/types/crewRange';
import {DriverSchema} from '@/app/common/types/drivers';
import {StopsSchema,} from '@/app/common/types/stops';
// import {TrainsSchema} from '@/app/common/types/trains';

import Link from 'next/link';

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
  FormControl,
  FormLabel,
  Select,
  Flex,
  Spacer,
  Button,
  Input
} from '@/app/common/components';

import {fetcher} from '@/app/common/hook/swr';
import useSWR from 'swr';

import {ScheduleTable, ScheduleTableFormRow} from '@/app/common/components/table';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function TrainEdit() {

  const router = useRouter();
  const params = {
    slug: ''};
  if (typeof window !== 'undefined') {
    params.slug = new URLSearchParams(new URL(window.location.href).search).get('slug') ?? '';
  }
  // const {data: trainsObj, error: trainsError} = useSWR(
  //   'http://user.keio.ac.jp/~ub622319/dm_app/api/train_details', fetcher(TrainsSchema));


  const {data: trainObj, error: trainError} = useSWR(
    'http://user.keio.ac.jp/~ub622319/dm_app/api/train_detail/' + params.slug, fetcher(TrainSchema));
  const {data: stationsObj, error: stationError} = useSWR(
    'http://user.keio.ac.jp/~ub622319/dm_app/api/get_stations', fetcher(StationSchema));
  const stations = stationsObj?.stations;

  // const train = {
  //   num: trainObj?.train.train_id,
  //   destination: stations?.find(f=>f.station_id === trainObj?.train.destinaion)?.name ?? '',
  //   origin: stations?.find(f=>f.station_id === trainObj?.train.origin)?.name ?? ''
  // };

  const {data: driversObj, error: driverError} = useSWR(
    'http://user.keio.ac.jp/~ub622319/dm_app/api/get_drivers', fetcher(DriverSchema));
  const drivers = driversObj?.drivers;

  const {data: crewRangeObj, error: crewRangeError} = useSWR(
    `http://user.keio.ac.jp/~ub622319/dm_app/api/crewRange/${trainObj?.train.train_id}`, fetcher(CrewRangeSchema));
  // const crewRange = crewRangeObj?.range.map((e, i)=> {
  //   return {
  //     station: stations?.find(f=>f.station_id === e.station_id)?.name ?? '',
  //     driver: drivers?.find(f=>f.driver_id === e.driver_id)?.name ?? '',
  //   };
  // });

  const {data: stopsObj, error: stopsError} = useSWR(
    `http://user.keio.ac.jp/~ub622319/dm_app/api/stops/${trainObj?.train.train_id}`, fetcher(StopsSchema));

  // const stops = stopsObj?.stops.map((e, i)=> {
  //   return {
  //     station: stations?.find(f=>f.station_id === e.station_id)?.name ?? '',
  //     arrival: e.arrival_time,
  //     departure: e.departure_time,
  //   };
  // });

  const [origin, setOrigin] = useState<number>(trainObj?.train.origin ?? 0);
  const [destinaion, setDestination] = useState<number>(trainObj?.train.destinaion ?? 0);

  useEffect(()=>{
    setOrigin(trainObj?.train.origin ?? 0);
    setDestination(trainObj?.train.destinaion ?? 0);
  }, [trainObj]);

  console.log(trainError, stationError, driverError, crewRangeError, stopsError,);

  const [crewRangeState, setCrewRangeState] = useState(crewRangeObj?.range ?? []);

  useEffect(()=>{
    setCrewRangeState(crewRangeObj?.range ?? []);
  }, [crewRangeObj]);

  const [stopsState, setStopsState] = useState(stopsObj?.stops ?? []);
  useEffect(()=>{
    setStopsState(stopsObj?.stops ?? []);
  }, [stopsObj]);


  const updateTrain = async ()=>{
    const crewRes = fetch(
      `http://user.keio.ac.jp/~ub622319/dm_app/api/crewRange/${trainObj?.train.train_id}/edit`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: crewRangeState}),
      }
    );

    const stopsRes = fetch(
      `http://user.keio.ac.jp/~ub622319/dm_app/api/stops/${trainObj?.train.train_id}/edit`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({record: stopsState}),
      }
    );
    const trainRes = fetch(
      `http://user.keio.ac.jp/~ub622319/dm_app/api/train_detail/${trainObj?.train.train_id}/update`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ...trainObj?.train,
          origin: origin,
          destination: destinaion,
        }),
      }
    );
    await Promise.all([crewRes, stopsRes, trainRes]);
    router.push(`/train/detail?slug=${trainObj?.train.train_id}`);
  };
  return (
    <>
      <Heading as="h2" size="lg">列車管理 編集</Heading>
      <HStack p="1rem" spacing="1rem">
        <Box p="1rem">
          {/* <FormControl>
            <FormLabel>列車番号</FormLabel>
            <Input type="number" value={trainNum}
              onChange={e=>setTrainNum(parseInt(e.target.value, 10))}/>

            <Select value={trainNum} onChange={e=>setTrainNum(parseInt(e.target.value, 10))}>
              {
                trainsObj?.trains.map((e, i)=>
                  <option key={i} value={e.train_id}>{e.train_id}</option>)
              }
            </Select>
            </FormControl> */}
          <Heading as="h3" size="md">列車番号: {trainObj?.train.train_id}</Heading>
        </Box>
        <Flex p="1rem">
          <FormControl>
            <FormLabel>出発</FormLabel>
            <Select value={origin} onChange={e=>setOrigin(parseInt(e.target.value, 10))}>
              {
                stations?.map((e, i)=>
                  <option key={i} value={e.station_id}>{e.name}</option>)
              }
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>到着</FormLabel>
            <Select value={destinaion} onChange={e=>setDestination(parseInt(e.target.value, 10))}>
              {
                stations?.map((e, i)=>
                  <option key={i} value={e.station_id}>{e.name}</option>)
              }
            </Select>
          </FormControl>
        </Flex>
        <Spacer />
        <Flex>
          <Link href="/train/[slug]" as={`/train/${trainObj?.train.train_id}`}>
            <Button colorScheme='red'>キャンセル</Button></Link>

          <Button colorScheme='blue' onClick={updateTrain}>更新</Button>
        </Flex>

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
                {/* {
                  stops?.map((e, i)=>
                    <ScheduleTableRow key={i} element={[e.station, e.arrival?.toString() ?? '-', e.departure?.toString() ?? '-']} />)
                } */}
                {
                  stopsState?.map((e, i)=>
                    <ScheduleTableFormRow key={i} element={
                      [
                        <Text key={i}>{stations?.find(f=> f.station_id === e.station_id)?.name}</Text>,
                        (<FormControl key={i}>
                          <Input type="number" value={e.arrival_time ?? ''} onChange={f=>{
                            stopsState[i].arrival_time = parseInt(f.target.value, 10);
                            return setStopsState([...stopsState]);
                          }} />
                        </FormControl>
                        ),
                        (<FormControl key={i}>
                          <Input type="number" value={e.departure_time ?? ''} onChange={f=>{
                            stopsState[i].departure_time =
                              f.target.value === '' ? null : parseInt(f.target.value, 10);
                            return setStopsState([...stopsState]);
                          }} />
                        </FormControl>)
                      ]
                    } />)
                }
              </ScheduleTable>
            </TabPanel>
            <TabPanel>
              <ScheduleTable indexes={['駅', '運転手']}>
                {
                  crewRangeState?.map((e, i)=>
                    <ScheduleTableFormRow key={i} element={
                      [
                        <Text key={i}>{stations?.find(f=> f.station_id === e.station_id)?.name}</Text>,
                        (<FormControl key={i}>
                          <Select value={e.driver_id} onChange={f=>{
                            crewRangeState[i].driver_id = parseInt(f.target.value, 10);
                            return setCrewRangeState([...crewRangeState]);
                          }}>
                            {
                              drivers?.map((g, j)=>
                                <option key={j} value={g.driver_id}>{g.name}</option>)
                            }
                          </Select>
                        </FormControl>
                        )
                      ]
                    } />)
                }
              </ScheduleTable>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}