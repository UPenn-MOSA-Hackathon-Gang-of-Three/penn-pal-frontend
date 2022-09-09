import { Container, Flex, Box, Heading, Text } from '@chakra-ui/react';
import Lottie from 'lottie-react';

import ButtonLink from 'components/buttonLink';

import jumpingSuccess from 'assets/jumpingSuccess.json';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Container
      py={{ base: 7, lg: 20 }}
      maxW={{ base: '100%', lg: '85%' }}
      display='flex'
      alignItems='center'
      minHeight='100vh'
    >
      <Flex
        flexDirection={{ base: 'column-reverse', lg: 'row' }}
        justifyContent='space-between'
        alignItems='center'
      >
        <Box
          w={{ base: '100%', lg: '40%' }}
          textAlign={{ base: 'center', lg: 'left' }}
          mt={{ base: 7, lg: 0 }}
        >
          <Heading as='h1' size='2xl' mb={4}>
            Event created successful
          </Heading>
          <Text mb={7}>
            Thank you for help professionals and students connect with others around the world!
          </Text>
          <ButtonLink to='/event/new' size='sm' sx={{ mr: 3, mt: 3 }}>
            New Event
          </ButtonLink>
          <ButtonLink to='/event/status' outline size='sm' sx={{ mt: 3 }}>
            Back Home
          </ButtonLink>
        </Box>
        <Box w={{ base: '100%', lg: 'calc(60% - 1rem)' }}>
          <Lottie animationData={jumpingSuccess} loop />
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
