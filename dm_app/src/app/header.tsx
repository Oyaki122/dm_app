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
  VStack
} from './common/components';
import {HamburgerIcon} from '@chakra-ui/icons';

import NextLink from 'next/link';
import {MutableRefObject, useRef} from 'react';


export default function Header() {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = useRef() as MutableRefObject<HTMLButtonElement>;
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
              <DrawerHeader>メニュー</DrawerHeader>
              <DrawerBody>
                <VStack spacing={4}>
                  <NextLink href="/driver">運転手スケジュール</NextLink>
                  <NextLink href="/crew">車掌スケジュール</NextLink>
                  <NextLink href="/train">列車スケジュール</NextLink>
                  <NextLink href="/station">駅時刻表</NextLink>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>
    </Box>
  );
}