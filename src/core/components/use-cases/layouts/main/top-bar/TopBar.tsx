import React, { FunctionComponent } from 'react';
import {
  AppBox,
  AppButton,
  AppIconButton,
  AppToolbar,
  AppTopBar,
  AppTypography,
} from '@core/components';
import { Menu } from '@mui/icons-material';

interface TopBarProps {}

export const TopBar: FunctionComponent<TopBarProps> = () => (
  <AppBox sx={{ flexGrow: 1 }}>
    <AppTopBar position='static'>
      <AppToolbar>
        <AppIconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
        >
          <Menu />
        </AppIconButton>
        <AppTypography variant='h6' sx={{ flexGrow: 1 }}>
          News
        </AppTypography>
        <AppButton color='inherit'>Login</AppButton>
      </AppToolbar>
    </AppTopBar>
  </AppBox>
);
