interface AppWindow
{
  id: string;
  position: Position;
  dimensions: Dimensions;
  title: string;
  active: boolean;
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

interface Dimensions
{
  width: number;
  height: number;
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

type AppWindowsReducerDispatch = (action: AppWindowsReducerAction) => void;

type ContextMenuReducerDispatch = (action: ContextMenuReducerAction) => void;

type StartMenuReducerDispatch = (action: StartMenuReducerAction) => void;
