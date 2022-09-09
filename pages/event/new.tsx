import { useState } from 'react';
import {
  SlideFade,
  Container,
  Box,
  Heading,
  Text,
  Progress,
} from '@chakra-ui/react';

import CreateEventForm from 'components/createEventForm';

import type { NextPage } from 'next';

const NewEvent: NextPage = () => {
  const [progress, setProgress] = useState<number>(0);

  return (
    <SlideFade in offsetY='100vh'>
      <Box
        position='sticky'
        top={0}
        pt={{ base: 7, lg: 20 }}
        bg='white'
        zIndex={1}
      >
        <Container maxW={{ base: '100%', lg: '2xl' }} mb={{ base: 7, lg: 10 }}>
          <Heading fontSize={{ base: 'lg', lg: '3xl' }} fontWeight='600'>
            Create New Event
          </Heading>
          <Text
            mt={3}
            color='blackAlpha.600'
            fontSize={{ base: 'sm', lg: 'md' }}
          >
            Lorem ipsum dolor sit amet
          </Text>
        </Container>
        <Progress
          value={progress}
          size='xs'
          hasStripe
          isAnimated
          colorScheme='pennBlue'
        />
      </Box>
      <Container maxW={{ base: '100%', lg: '2xl' }} py={{ base: 12, lg: 20 }}>
        <CreateEventForm
          onProgressChange={setProgress}
          onSubmit={console.log}
        />
      </Container>
    </SlideFade>
  );
};

export default NewEvent;
