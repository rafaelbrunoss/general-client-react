import React, { FunctionComponent, Fragment, PropsWithChildren } from 'react';

interface EmptyLayoutProps extends PropsWithChildren<any> {}

export const EmptyLayout: FunctionComponent<EmptyLayoutProps> = (
  props: EmptyLayoutProps,
) => {
  const { children } = props;
  return <Fragment>{children}</Fragment>;
};
