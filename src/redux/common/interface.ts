import {History} from "history";

export type Id = string

export interface Pagination {
  page: string;
  limit: string
}

export interface ResponseGenerator<T>{
  data?: T,
  status?:number,
  message?: string,
}

export interface Ids {
  id: Id,
  catId: Id
}

export interface IAllEntities<T> {
  entities: T[];
  total: number
}

export type actionPayloadIdType = {
  id: Id
}

export type actionPayloadByCatIdType = {
  id: Id,
  pagination: Pagination
}

export type actionPayloadDataType<T> = {
  data: T
}

export type actionPayloadHistoryType<T> = {
  data: T,
  id: Id,
  history: History
}

export interface IAction<T> {
  type: string;
  payload?: T | actionPayloadIdType | Ids | Pagination | actionPayloadByCatIdType | actionPayloadDataType<T> | actionPayloadHistoryType<T>;
}

export type getAllEntityType<T> = ({}: Pagination) => IAction<T>
export type deleteEntityType<T> = (id: Id) => IAction<T>
export type getArticleByCategoryType<T> = (id: Id, {}: Pagination) => IAction<T>


export interface IGeneralItem {
  _id: Id;
  title: string;
}

