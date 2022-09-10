import { Button as ChakraButton } from '@chakra-ui/react';

import type {
  ReactNode,
  ReactElement,
  JSXElementConstructor,
  MouseEventHandler,
} from 'react';

type Props = {
  children: ReactNode;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  outline?: boolean;
  icon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  sx?: any;
};

const Button = ({
  children,
  size = 'sm',
  outline = false,
  icon,
  type = 'button',
  onClick = () => {},
  sx,
}: Props) => (
  <ChakraButton
    size={size}
    leftIcon={icon}
    type={type}
    onClick={onClick}
    sx={sx}
    colorScheme={outline ? 'blackAlpha' : 'pennBlue'}
    variant={outline ? 'outline' : 'solid'}
  >
    {children}
  </ChakraButton>
);

export default Button;
