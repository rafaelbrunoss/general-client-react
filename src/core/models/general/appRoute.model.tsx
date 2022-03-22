import React, { ComponentType, ReactNode } from 'react';

export class AppRoute {
  public path: string = '/';
  public component: ComponentType | ReactNode | any = {};
  public isPublic?: boolean = false;
  public useMainLayout?: boolean = true;
  public text?: string = '';
  public hideInLeftMenu?: boolean = false;

  public icon?: any = undefined;
  public addSeparatorAfter?: boolean = false;

  public showBreadcrumb?: boolean = true;

  public permission?: number = 0;

  constructor(appRoute: AppRoute) {
    Object.assign(this, appRoute);
  }
}
