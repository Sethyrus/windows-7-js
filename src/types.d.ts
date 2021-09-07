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

interface Position
{
  x: number;
  y: number;
}

interface RootState
{
  startMenu: StartMenuState;
  windows: WindowsState;
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

interface AppWindow
{
  id: string;
  // position: Position;
  // active: boolean;
  // maximized: boolean;
}

interface WindowsReducerAction
{
  type: string;
  payload: WindowsState;
}

interface WindowsState
{
  windows: AppWindow[];
}

type ContextMenuReducerDispatch = (action: ContextMenuReducerAction) => void;

type StartMenuReducerDispatch = (action: StartMenuReducerAction) => void;

type WindowsReducerDispatch = (action: WindowsReducerAction) => void;
