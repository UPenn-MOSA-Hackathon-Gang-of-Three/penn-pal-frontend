import { Container, Flex, Box, Heading, Text } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import collaborateAnimation from 'assets/collaborateAnimation.json';

import Button from 'components/button';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Container
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
            Match mentees with mentors
          </Heading>
          <Text mb={7}>
            Help professionals and students connect with others around the world
          </Text>
          <Button size='sm' sx={{ mr: 3, mt: 3 }}>
            Create an event
          </Button>
          <Button size='sm' outline sx={{ mt: 3 }}>
            View status
          </Button>
        </Box>
        <Box w={{ base: '100%', lg: 'calc(60% - 1rem)' }}>
          <Lottie animationData={collaborateAnimation} loop />
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
