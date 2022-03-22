import { FunctionComponent } from 'react';
import { AppBar, AppBarProps } from '@mui/material';

export interface AppTopBarProps extends AppBarProps {}

export const AppTopBar: FunctionComponent<AppTopBarProps> = (
  props: AppTopBarProps,
) => <AppBar {...props} />;
