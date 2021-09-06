interface ButtonProps
{
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export interface RootState
{
  startMenu: StartMenuState
}

interface StartMenuProps
{
  open: boolean;
}

export interface StartMenuReducerAction
{
  type: string;
  payload: StartMenuState;
}

interface StartMenuState
{
  open: boolean;
}

export interface Window
{
  id: string;
}

export interface WindowsReducerAction
{
  type: string;
  payload: WindowsState;
}

interface WindowsState
{
  windows: Window[];
}

export type StartMenuReducerDispatch = (action: StartMenuReducerAction) => void;

export type WindowsReducerDispatch = (action: WindowsReducerAction) => void;
