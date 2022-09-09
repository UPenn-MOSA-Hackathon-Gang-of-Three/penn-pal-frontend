import { Button as ChakraButton } from '@chakra-ui/react';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  outline?: Boolean;
  sx?: any;
};

const Button = ({ children, size = 'sm', outline = false, sx }: Props) => (
  <ChakraButton
    // Encapsulated props
    // disableElevation
    colorScheme={outline ? 'blackAlpha' : 'pennBlue'}
    // Exposed props
    size={size}
    variant={outline ? 'outline' : 'solid'}
    sx={sx}
  >
    {children}
  </ChakraButton>
);

export default Button;
