import { Router } from 'express';
import jwt from "jsonwebtoken";

import type { ObjectId } from 'mongodb';

import { createUser } from '../models/users';
import { loginUser } from '../models/auth';
import type { TUserPostRequest } from '../types';

const router = Router();

const JWT_SECRET = Bun.env.JWT_SECRET || "aV3ry$3cyore70k3m";
const JWT_EXPIRESIN = Number(Bun.env.JWT_EXPIRESIN) || 43200000;

const generateToken = (creds: { id: ObjectId | undefined }) => {
  if (!creds.id) return;

  const secret = JWT_SECRET;
  const expires_in = JWT_EXPIRESIN.toString();
  const payload = { id: creds.id }

  const token = jwt.sign(payload, secret, { expiresIn: expires_in })
  return token
}

router.post<
  "/login",
  {},
  { id: ObjectId | undefined },
  { username: string, password: string },
  {},
  {}
>("/login", async (req, res, next) => {
  const { username, password } = req.body

  const resp = await loginUser({ data: { username } })

  if (!resp) next({ statusCode: 404 })
  if (resp && resp.password !== password) next({ statusCode: 401 })

  const token = generateToken({ id: resp?._id })

  return res
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, *')
    .cookie('token', token, {
      httpOnly: true,
      maxAge: 43200000, // 0.5 days
      secure: false,// true for prod
    })
    .json({
      id: resp?._id
    })
})


router.post<
  "/register",
  {},
  { message: "success" | "failed" },
  TUserPostRequest,
  {},
  {}
>("/register", async (req, res) => {
  const data = req.body
  const resp = await createUser({ data })
  console.log(resp)
  return res.json({
    message: "success"
  })
})

router.post<
  "/logout",
  {},
  { message: "success" | "failed" },
  { id: string },
  {},
  {}
>("/logout", async (req, res) => {
  const data = req.body
  return res.clearCookie("token", {
    httpOnly: true,
    secure: false
  })
    .json({
      message: "success"
    })
})

router.post<
  "/clearcookies"
>("/clearcookies", async (req, res, next) => {
  res.clearCookie('token', { httpOnly: true, sameSite: "none", secure: false })
  res.clearCookie('token', { httpOnly: true, sameSite: "none", secure: true })
  res.clearCookie('token', { httpOnly: true, sameSite: "strict", secure: false })
  res.clearCookie('token', { httpOnly: true, sameSite: "strict", secure: true })
  res.clearCookie('token', { httpOnly: true, sameSite: "lax", secure: true })
  res.clearCookie('token', { httpOnly: true, sameSite: "lax", secure: false })
  return res.send("done")
})

router.get<
  "/test"
>("/test", async (req, res, next) => {
  res.cookie("test", "test", {
    httpOnly: true,
    secure: false,
    domain: "localhost",
    maxAge: 43200000
  })
})

export default router;
