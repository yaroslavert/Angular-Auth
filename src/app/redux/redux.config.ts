import { User } from './../auth/interfaces/auth.interface';
import { Injectable, InjectionToken } from '@angular/core';
import { Action, ActionCreator, createStore, Reducer, Store } from 'redux';

export interface AppState {
    user: User;
}
export interface MyAction extends AppState {
    type: String;
}

const initialState = {
    user: null
};
export const ActionList = {
    updateUser: 'UpdateUser',
};

export const reducer: Reducer<AppState> =
(state: AppState = initialState, action: MyAction): AppState => {
  switch (action.type) {
  case 'UpdateUser' : {
    return Object.assign({}, state, { user: action.user });
  }
  default:
    return state;
  }
};

export const AppStore = new InjectionToken('App.store');
export function createAppStore(): Store<AppState> {
    return createStore<AppState>(reducer);
}
export const appStoreProviders = [
    { provide: AppStore, useFactory: createAppStore }
];
