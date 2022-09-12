import { Container, Heading } from '@chakra-ui/react';

import type { NextPage } from 'next';

const ComingSoon: NextPage = () => {
  return (
    <Container
      py={{ base: 7, lg: 20 }}
      maxW={{ base: '100%', lg: '85%' }}
      display='flex'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
    >
      <Heading as='h1' size='2xl' mb={4}>
        Coming soon...
      </Heading>
    </Container>
  );
};

export default ComingSoon;
