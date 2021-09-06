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

export type StartMenuReducerDispatch = (action: StartMenuReducerAction) => void;
