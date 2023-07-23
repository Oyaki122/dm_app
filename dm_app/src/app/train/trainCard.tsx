import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text
} from '../common/components';
import Link from 'next/link';

export default function TrainCard({num, destination, origin}: {num: number, destination: string, origin: string}) {
  return (
    <Link href={`/train/detail?slug=${num}`}>
      <Card size={'sm'} variant={'outline'}>
        <CardHeader pb={0}>
          <Heading as="h3" size="md">Train {num}</Heading>
        </CardHeader>
        <CardBody>
          <Text pt='1' fontSize='sm'>
            <b>Destination:</b> {destination}
          </Text>
          <Text pt='1' fontSize='sm'>
            <b>Origin:</b> {origin}
          </Text>
        </CardBody>
      </Card>
    </Link>
  );
}