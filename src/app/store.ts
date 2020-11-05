import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { reducer } from '../features'
import { PageInfo } from '../relay'

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void, E = unknown> = ThunkAction<
  ReturnType,
  RootState,
  E,
  Action<string>
>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type Loadable = {
  loading?: boolean
  loaded?: boolean
  error?: string
  pageInfo?: PageInfo
  selected?: string
}