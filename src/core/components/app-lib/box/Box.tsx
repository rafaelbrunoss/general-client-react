import { FunctionComponent } from 'react';
import { Box, BoxProps } from '@mui/material';

export interface AppBoxProps extends BoxProps {}

export const AppBox: FunctionComponent<AppBoxProps> = (props: AppBoxProps) => (
  <Box {...props} />
);
