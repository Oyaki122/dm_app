'use client';

import {
  Box, Flex, Heading, Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  // HStack,
  // Input
} from './common/components';
import {HamburgerIcon} from '@chakra-ui/icons';

import NextLink from 'next/link';
import {MutableRefObject, useRef,
  // useState
} from 'react';
// import useUser from './common/hook/login';
// import {useRouter} from 'next/navigation';

export default function Header() {
  // const {user, loading, loggedOut, mutate} = useUser();

  // const [username, setUsername] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  // const [password2, setPassword2] = useState<string>('');
  // const [isRegister, setIsRegister] = useState<boolean>(false);

  // const router = useRouter();

  // const login = async ()=>{
  //   await fetch('http://user.keio.ac.jp/~ub622319/dm_app/api/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({username, password}),
  //     credentials: 'include',
  //   });
  //   mutate();
  //   router.push(`/`);
  // };

  // const register = async ()=>{
  //   if (password !== password2) {
  //     alert('パスワードが一致しません');
  //     return;
  //   }
  //   await fetch('http://user.keio.ac.jp/~ub622319/dm_app/api/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({username, password}),
  //     credentials: 'include',
  //   });
  //   mutate();
  //   setIsRegister(false);
  //   router.push(`/`);
  // };


  // console.log(loggedOut, loading, user);

  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = useRef() as MutableRefObject<HTMLButtonElement>;

  // const LoginComponent = ()=> (<>
  //   <DrawerHeader>{isRegister ? '新規登録' : 'ログイン'} </DrawerHeader>
  //   <DrawerBody>
  //     <VStack spacing={4} align={'start'} >
  //       <Input placeholder="ユーザー名" type='text' value={username} onChange={(e)=>setUsername(e.target.value)}/>
  //       <Input placeholder="パスワード" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
  //       {isRegister && <Input placeholder="パスワード(確認)" type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)}/> }
  //       <HStack>
  //         {isRegister ?
  //           (<>
  //             <Button onClick={()=>setIsRegister(false)}>戻る</Button>
  //             <Button onClick={register}>登録</Button>
  //           </>) : (<>
  //             <Button onClick={()=>setIsRegister(true)}>新規登録</Button>
  //             <Button onClick={login}>ログイン</Button>
  //           </>)}
  //       </HStack>
  //     </VStack>
  //   </DrawerBody>
  // </>);


  return (
    <Box as="header">
      <Flex
        bg="white"
        color="gray.600"
        minH={'60px'}
        py={{base: 2}}
        px={{base: 4}}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        align="center"
      >
        <Flex flex={1} justify="space-between" maxW="5xl" mx="auto">
          <Heading as="h1" size="lg">
            <NextLink href="/">鉄道管理</NextLink>
          </Heading>
          <Button ref={btnRef} colorScheme='BlackAlpha' onClick={onOpen}>
            <HamburgerIcon color="black"/>
          </Button>
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              {
                // loggedOut || loading ?
                //   <LoginComponent />
                //   :
                <>
                  <DrawerHeader>メニュー</DrawerHeader>
                  <DrawerBody>
                    <VStack spacing={4}>
                      <NextLink href="/driver">運転手スケジュール</NextLink>
                      <NextLink href="/train">列車スケジュール</NextLink>
                      <NextLink href="/station">駅時刻表</NextLink>
                      <NextLink href="/newTrain">新規列車追加</NextLink>
                    </VStack>
                  </DrawerBody>
                </>
              }
            </DrawerContent>

          </Drawer>
        </Flex>
      </Flex>
    </Box>
  );
}