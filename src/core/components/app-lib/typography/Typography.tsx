import { FunctionComponent } from 'react';
import { Typography, TypographyProps } from '@mui/material';

export interface AppTypographyProps extends TypographyProps {}

export const AppTypography: FunctionComponent<AppTypographyProps> = (
  props: AppTypographyProps,
) => <Typography {...props} />;
