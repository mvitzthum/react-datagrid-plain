import * as React from "react";
import { IState } from "./IState";

export interface IDataGridStateContext {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}

export const DataGridState = React.createContext<
  IDataGridStateContext | undefined
>(undefined);

type ReducerActionType =
  | "set-total"
  | "set-page"
  | "set-rowsperpage"
  | "set-orderBy"
  | "set-filter"
  | "reload";

export interface IAction {
  type: ReducerActionType;
  payload: any;
}

export function reducer(
  s: any,
  action: { type: ReducerActionType; payload: any }
) {
  switch (action.type) {
    case "set-total":
      return { ...s, total: action.payload };
    case "set-page":
      return { ...s, page: action.payload };
    case "set-rowsperpage":
      return { ...s, rowsPerPage: action.payload };
    case "set-orderBy":
      return { ...s, ...action.payload };
    case "set-filter":
      return { ...s, filter: { ...s.filter, ...action.payload } };
    case "reload":
      return { ...s, reloadDummy: !s.reloadDummy };

    default:
      throw new Error();
  }
}

export function DataGridStateProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer<React.Reducer<IState, IAction>>(
    reducer,
    createDefaultState()
  );

  return (
    <DataGridState.Provider value={{ state, dispatch }}>
      {children}
    </DataGridState.Provider>
  );
}

function createDefaultState(): IState {
  return {
    rowsPerPage: 10,
    page: 0,
    total: 0,
    orderBy: undefined,
    desc: false,
    filter: {},
    reloadDummy: false
  };
}
