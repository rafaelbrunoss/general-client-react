import { FunctionComponent } from 'react';
import { IconButton, IconButtonProps } from '@mui/material';

export interface AppIconButtonProps extends IconButtonProps {}

export const AppIconButton: FunctionComponent<AppIconButtonProps> = (
  props: AppIconButtonProps,
) => <IconButton {...props} />;
