export type TTask = {
  _id?: string;
  title: string;
  description: string;
  deadline: Date;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TUser = {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  taskList: TTask[];
}

export type TUserGetRequest = Partial<Omit<TUser, 'taskList' | 'password'>>
export type TUserGetListRequest = Partial<Omit<TUser, 'taskList' | 'password'>>
export type TUserPostRequest = Omit<TUser, 'taskList'>;
export type TUserPutRequest = Omit<TUser, 'taskList' | 'password'>;
export type TUserDeleteRequest = { id: string }

export type TTaskGetRequest = Partial<TTask>
export type TTaskGetListRequest = Partial<TTask>
export type TTaskPostRequest = Omit<TTask, 'createdAt' | 'updatedAt'>
export type TTaskPutRequest = Omit<TTask, 'createdAt' | 'updatedAt'>
export type TTaskDeleteRequest = Pick<TTask, 'title' | 'createdAt' | 'updatedAt'>

export type TUserGetResponse = Omit<TUser, 'taskList' | 'password'>;
export type TUserGetListResponse = Omit<TUser, 'taskList' | 'password'>[];
export type TUserPostResponse = Omit<TUser, 'taskList' | 'password'>
export type TUserPutResponse = Omit<TUser, 'taskList' | 'password'>;
export type TUserDeleteResponse = Omit<TUser, 'taskList' | 'password'>;

export type TTaskGetResponse = TTask
export type TTaskGetListResponse = { taskList: (TTask & { id: string })[] };
export type TTaskPostResponse = TTask;
export type TTaskPutResponse = TTask;
export type TTaskDeleteResponse = TTask;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
