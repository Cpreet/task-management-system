import { Router } from 'express';
import type { RequestHandler } from 'express';
import { type TTaskDeleteRequest, type TTaskDeleteResponse, type TTaskGetListRequest, type TTaskGetListResponse, type TTaskGetRequest, type TTaskGetResponse, type TTaskPostRequest, type TTaskPostResponse, type TTaskPutRequest, type TTaskPutResponse } from '../types';
import { createTask, getAllTasks, updateTask } from '../models/tasks';

const router = Router();

router.get<
  '/',
  {},
  TTaskGetResponse,
  {},
  TTaskGetRequest,
  {}
>('/', (req, res, next) => {
  next({ statusCode: 501 })
})

router.get<
  '/all',
  {},
  TTaskGetListResponse,
  {},
  TTaskGetListRequest,
  {}
>('/all', async (req, res, next) => {
  const id = req.query.id
  const resp = await getAllTasks({ data: { id } })
  return res.json(resp)
})

router.post<
  '/',
  {},
  TTaskPostResponse,
  TTaskPostRequest,
  {},
  {}
>('/', async (req, res, next) => {
  const data = req.body
  const resp = await createTask({ data })
  return res.json(resp)
})

router.put<
  '/',
  {},
  TTaskPutResponse,
  TTaskPutRequest,
  {},
  {}
>('/', async (req, res, next) => {
  const data = req.body
  const resp = await updateTask({ data })
  return res.json(resp)
})

router.delete<
  '/',
  {},
  TTaskDeleteResponse,
  TTaskDeleteRequest,
  {},
  {}
>('/', (req, res, next) => {
  next({ statusCode: 501 })
})

export default router;
