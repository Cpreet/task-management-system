import { Router } from 'express';
import type { RequestHandler } from 'express';
import type { TUserDeleteRequest, TUserDeleteResponse, TUserGetRequest, TUserGetResponse, TUserPostRequest, TUserPostResponse, TUserPutRequest, TUserPutResponse } from '../types';

const router = Router();

router.get<
  '/',
  {},
  TUserGetResponse,
  {},
  TUserGetRequest,
  {}
>('/', (req, res) => {
  res.json({ _id: "1", name: "name", email: "email", username: "username" })
})

router.post<
  '/',
  {},
  TUserPostResponse,
  TUserPostRequest,
  {},
  {}
>('/', (req, res) => { })

router.put<
  '/',
  {},
  TUserPutResponse,
  TUserPutRequest,
  {},
  {}
>('/', (req, res) => { })

router.delete<
  '/',
  {},
  TUserDeleteResponse,
  TUserDeleteRequest,
  {},
  {}
>('/', (req, res) => { })

export default router
