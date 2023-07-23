'use client';

import {TrainSchema} from '@/app/common/types/train';
import {StationSchema} from '@/app/common/types/stations';
import {DriverSchema} from '@/app/common/types/drivers';


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
  Input,
  Td
} from '@/app/common/components';

import {fetcher} from '@/app/common/hook/swr';
import useSWR from 'swr';

import {ScheduleTable, ScheduleTableFormRow} from '@/app/common/components/table';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function NewTrain() {
  const {data: stationsObj, error: stationError} = useSWR(
    'http://localhost:5000/api/get_stations', fetcher(StationSchema));
  const stations = stationsObj?.stations;

  const {data: driversObj, error: driverError} = useSWR(
    'http://localhost:5000/api/get_drivers', fetcher(DriverSchema));
  const drivers = driversObj?.drivers;

  const [origin, setOrigin] = useState<number>(0);
  const [destinaion, setDestination] = useState<number>(0);
  const [trainNum, setTrainNum] = useState<number>(0);


  const [scheduleState, setScheduleState] = useState<{
    station_id: number;
    arrival_time: number | null;
    departure_time: number | null;
    driver_id: number;
  }[]>([]);

  const router = useRouter();

  const updateTrain = async ()=>{

    const payload = {
      train: {
        schedule: scheduleState.map(e=>({
          ...e, conductor_id: 1})),
        detail: {
          origin,
          destinaion,
          car_id: 0,
          id: trainNum
        }
      }
    };

    await fetch(
      `http://localhost:5000/api/add_train`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      }
    );
    router.push(`/train/`);
  };
  return (
    <>
      <Heading as="h2" size="lg">列車管理 編集</Heading>
      <HStack p="1rem" spacing="1rem">
        <Box p="1rem">
          <FormControl>
            <FormLabel>列車番号</FormLabel>
            <Input type="number" value={trainNum}
              onChange={e=>setTrainNum(parseInt(e.target.value, 10))}/>
          </FormControl>
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
          <Box p="0.25rem">
            <Link href="/train/[slug]" as={`/train`}>
              <Button colorScheme='red'>キャンセル</Button></Link>
          </Box>
          <Box p="0.25rem">
            <Button colorScheme='blue' onClick={updateTrain}>更新</Button>
          </Box>
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
              <ScheduleTable indexes={['駅', '到着時間', '出発時間', '']}>
                {
                  scheduleState?.map((e, i)=>
                    <ScheduleTableFormRow key={i} element={
                      [
                        (
                          <Select
                            key={i}
                            variant='outline'
                            value={e.station_id ?? ''}
                            onChange={f => {
                              scheduleState[i].station_id = parseInt(f.target.value, 10);
                              return setScheduleState([...scheduleState]);
                            }}
                          >
                            <option value={0}>駅を選択</option>
                            {
                              stations?.map(f =>{
                                return <option key={f.station_id} value={f.station_id}>{f.name}</option>;
                              })
                            }
                          </Select>
                        ),
                        (<FormControl key={i}>
                          <Input type="number" value={e.arrival_time ?? ''} onChange={f=>{
                            scheduleState[i].arrival_time = parseInt(f.target.value, 10);
                            return setScheduleState([...scheduleState]);
                          }} />
                        </FormControl>
                        ),
                        (<FormControl key={i}>
                          <Input type="number" value={e.departure_time ?? ''} onChange={f=>{
                            scheduleState[i].departure_time =
                              f.target.value === '' ? null : parseInt(f.target.value, 10);
                            return setScheduleState([...scheduleState]);
                          }} />
                        </FormControl>),
                        (<Button key={i} colorScheme='red' onClick={()=>{
                          scheduleState.splice(i, 1);
                          return setScheduleState([...scheduleState]);
                        }}>削除</Button>)
                      ]
                    } />
                  )
                }
                <Td>
                  <Button colorScheme='blue' onClick={()=>{
                    setScheduleState([...scheduleState, {
                      station_id: 0,
                      arrival_time: null,
                      departure_time: null,
                      driver_id: 0
                    }]);
                  }}>追加</Button>
                </Td>
              </ScheduleTable>
            </TabPanel>
            <TabPanel>
              <ScheduleTable indexes={['駅', '運転手']}>
                {
                  scheduleState?.map((e, i)=>
                    <ScheduleTableFormRow key={i} element={
                      [(
                        <Select
                          key={i}
                          variant='outline'
                          value={e.station_id ?? ''}
                          onChange={f => {
                            scheduleState[i].station_id = parseInt(f.target.value, 10);
                            return setScheduleState([...scheduleState]);
                          }}
                        >
                          <option value={0}>駅を選択</option>
                          {
                            stations?.map(f =>{
                              return <option key={f.station_id} value={f.station_id}>{f.name}</option>;
                            })
                          }
                        </Select>
                      ),
                      (<FormControl key={i}>
                        <Select value={e.driver_id} onChange={f=>{
                          scheduleState[i].driver_id = parseInt(f.target.value, 10);
                          return setScheduleState([...scheduleState]);
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
                <Td>
                  <Button colorScheme='blue' onClick={()=>{
                    setScheduleState([...scheduleState, {
                      station_id: 0,
                      arrival_time: null,
                      departure_time: null,
                      driver_id: 1
                    }]);
                  }}>追加</Button>
                </Td>
              </ScheduleTable>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}