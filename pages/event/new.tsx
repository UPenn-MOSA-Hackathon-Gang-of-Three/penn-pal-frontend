import { useState } from 'react';
import { useRouter } from 'next/router';
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
import { FormikValues } from 'formik';

const NewEvent: NextPage = () => {
  const router = useRouter();

  const [progress, setProgress] = useState<number>(0);

  const handleSubmit = (values: FormikValues) => {
    router.push({
      pathname: '/event/success',
      query: {
        eventName: values.eventName,
        uniqueId: 12345,
      },
    });
  };

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
            Create Mentor-Mentee Event
          </Heading>
          <Text
            mt={3}
            color='blackAlpha.600'
            fontSize={{ base: 'sm', lg: 'md' }}
          >
            Please fill in the following application.
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
          onSubmit={handleSubmit}
        />
      </Container>
    </SlideFade>
  );
};

export default NewEvent;
