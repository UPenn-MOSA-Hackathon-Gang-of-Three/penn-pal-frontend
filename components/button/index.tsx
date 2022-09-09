import { Button as ChakraButton } from '@chakra-ui/react';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  outline?: boolean;
  sx?: any;
};

const Button = ({ children, size = 'sm', outline = false, sx }: Props) => (
  <ChakraButton
    size={size}
    sx={sx}
    colorScheme={outline ? 'blackAlpha' : 'pennBlue'}
    variant={outline ? 'outline' : 'solid'}
  >
    {children}
  </ChakraButton>
);

export default Button;
