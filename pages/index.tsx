import { Container, Flex, Box, Heading, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import Lottie from 'lottie-react';

import ButtonLink from 'components/buttonLink';

import handshake from 'assets/handshake.json';

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
        w='full'
        flexDirection={{ base: 'column-reverse', lg: 'row' }}
        justifyContent='space-between'
        alignItems='center'
      >
        <Box
          w={{ base: '100%', lg: '40%' }}
          textAlign={{ base: 'center', lg: 'left' }}
          mt={{ base: 7, lg: 0 }}
        >
          <NextImage
            src='/penn-pal-logo.png'
            width='150px'
            height='150px'
            style={{ borderRadius: '1rem' }}
          />
          <Heading as='h1' size='2xl' mt={8} mb={4}>
            Match mentees with mentors
          </Heading>
          <Text mb={7}>
            Help professionals and students connect with others around the world
          </Text>
          <ButtonLink to='/event/new' sx={{ mr: 3, mt: 3 }}>
            Create an event
          </ButtonLink>
          <ButtonLink to='/event/status' outline sx={{ mt: 3 }}>
            View status
          </ButtonLink>
        </Box>
        <Box w={{ base: '100%', lg: '60%' }} pl={{ lg: 4 }}>
          <Lottie animationData={handshake} loop />
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
