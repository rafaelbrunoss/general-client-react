import { FunctionComponent } from 'react';
import { Button, ButtonProps } from '@mui/material';

export interface AppButtonProps extends ButtonProps {}

export const AppButton: FunctionComponent<AppButtonProps> = (
  props: AppButtonProps,
) => <Button {...props} />;
