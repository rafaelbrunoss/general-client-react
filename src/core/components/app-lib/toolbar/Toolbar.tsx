import { FunctionComponent } from 'react';
import { Toolbar, ToolbarProps } from '@mui/material';

export interface AppToolbarProps extends ToolbarProps {}

export const AppToolbar: FunctionComponent<AppToolbarProps> = (
  props: AppToolbarProps,
) => <Toolbar {...props} />;
