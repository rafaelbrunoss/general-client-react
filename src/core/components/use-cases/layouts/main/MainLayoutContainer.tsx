import {
  FunctionComponent,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
  createContext,
} from 'react';
import { LocalStorageService } from '@core/services';
import { AppRoute } from '@core/models';
import { parseBool } from '@core/utils';

interface RouterContextProps {
  routes: AppRoute[];
  menuExpanded: boolean;
  setMenuExpanded?: Dispatch<SetStateAction<boolean>>;
}

interface RouterContainerContextProps {
  children: ReactNode;
  routes: AppRoute[];
}

const emptyDrawerContext = {
  routes: [],
  menuExpanded: false,
};

const MainLayoutContainerContext =
  createContext<RouterContextProps>(emptyDrawerContext);

const MainLayoutContainer: FunctionComponent<RouterContainerContextProps> = (
  props: RouterContainerContextProps,
) => {
  const initialState =
    LocalStorageService.getLocalStorage('main-layout-menu-expanded') || 'false';
  const [drawerExpanded, setDrawerExpanded] = useState<boolean>(
    parseBool(initialState),
  );

  const valueProvider: RouterContextProps = {
    ...emptyDrawerContext,
    routes: props.routes,
    menuExpanded: drawerExpanded,
    setMenuExpanded: setDrawerExpanded,
  };

  return (
    <MainLayoutContainerContext.Provider value={valueProvider}>
      {props.children}
    </MainLayoutContainerContext.Provider>
  );
};

export { MainLayoutContainerContext, MainLayoutContainer };
