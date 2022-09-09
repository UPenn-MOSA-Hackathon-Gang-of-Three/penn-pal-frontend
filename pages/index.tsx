import { Container, Flex, Box, Heading, Text } from '@chakra-ui/react';

import Button from 'components/button';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Container
      maxW={{ base: '100%', lg: '85%' }}
      sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      <Flex flexDirection={{ base: 'column-reverse', lg: 'row' }}>
        <Box w={{ base: '100%', lg: '60%' }}>
          <Heading as='h1' size='2xl' mb={4}>
            Mentor-mentee matching
          </Heading>
          <Text mb={7}>
            Help professionals and students connect with others around the world
          </Text>
          <Button size='sm' sx={{ mr: 3 }}>
            Create an event
          </Button>
          <Button size='sm' outline>
            View status
          </Button>
        </Box>
        <Box>Lottie goes here</Box>
      </Flex>
    </Container>
  );
};

export default Home;
