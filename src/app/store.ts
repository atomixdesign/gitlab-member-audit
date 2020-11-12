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

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type Loadable = {
  isBulkLoading?: boolean
  loading?: boolean
  loaded?: boolean
  error?: string
  pageInfo?: PageInfo
  selected?: string
  pagesLoaded?: number
  itemsLoaded?: number
}