import { FunctionComponent } from 'react';
import { CircularProgress, CircularProgressProps } from '@mui/material';

export interface AppLoaderProps extends CircularProgressProps {}

export const AppLoader: FunctionComponent<AppLoaderProps> = (
  props: AppLoaderProps,
) => <CircularProgress {...props} />;
