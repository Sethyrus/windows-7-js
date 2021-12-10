interface AppWindow
{
  id: string;
  position: Position;
  dimensions: Dimensions;
  title: string;
  minimized: boolean;
  maximized: boolean;
  pristine: boolean;
}

interface AppWindowProps
{
  appWindow: AppWindow;
  id: string;
}

interface AppWindowsReducerAction
{
  type: string;
  payload: AppWindowsState;
}

interface AppWindowsState
{
  appWindows: AppWindow[];
}

interface ButtonProps
{
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

interface ClickOutsideProps
{
  onClick(e: MouseEvent): void;
  children: React.ReactElement;
}

interface ContextMenuState
{
  open: boolean;
  position: Position;
}

interface ContextMenuReducerAction
{
  type: string;
  payload: ContextMenuState;
}

interface DesktopItem
{
  id: string;
  position: Position;
  title: string;
  pristine: boolean;
}

interface DesktopItemsReducerAction
{
  type: string;
  payload: DesktopItemsState;
}

interface DesktopItemsState
{
  desktopItems: DesktopItem[];
}

interface Dimensions
{
  width: number;
  height: number;
}

interface FunctionalityEvent
{
  component: AppComponent;
  entity: AppWindow | DesktopItem | DesktopSelection;
  action: FunctionalityEventAction;
}

interface FunctionalityObject
{
  id: string;
  component: AppComponent;
  functionalities: Functionality[];
}

interface Position
{
  x: number;
  y: number;
}

interface RootState
{
  startMenu: StartMenuState;
  appWindows: AppWindowsState;
  contextMenu: ContextMenuState;
}

interface DesktopSelection
{
  id: string;
  position: Position;
  // title: string;
  // pristine: boolean;
  width: number;
  height: number;
}

interface StartMenuProps
{
  open: boolean;
}

interface StartMenuReducerAction
{
  type: string;
  payload: StartMenuState;
}

interface StartMenuState
{
  open: boolean;
}

type AppComponent = 'APP_WINDOW' | 'DESKTOP_ITEM' | 'DESKTOP';

type AppWindowsReducerDispatch = (action: AppWindowsReducerAction) => void;

type ContextMenuReducerDispatch = (action: ContextMenuReducerAction) => void;

type DesktopItemsReducerDispatch = (action: DesktopItemsReducerAction) => void;

type FunctionalityEventAction = 'DRAG' | 'CLOSE' | 'MAXIMIZE' | 'FRONT' | 'SELECT';

type Functionality = 'APP_WINDOW_DRAGGABLE' | 'APP_WINDOW_FRONTABLE' | 'APP_WINDOW_CLOSABLE' | 'APP_WINDOW_MAXIMIZABLE' | 'DESKTOP_SELECTABLE';

type StartMenuReducerDispatch = (action: StartMenuReducerAction) => void;
