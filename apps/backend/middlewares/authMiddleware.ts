import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";

const JWT_SECRET = Bun.env.JWT_SECRET ||"aV3ry$3cyore70k3m";

const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    if (!req.cookies.token) next({ statusCode: 401 })

    const payload = jwt.verify(req.cookies.token, JWT_SECRET)
    if (typeof payload === 'string') next({ statusCode: 401 })
    // if (typeof payload !== 'string' && payload.id === currId ) next({ statusCode: 401 })
    if (typeof payload !== 'string' && req.method === "GET")
      req.query.id = payload.id
    if (typeof payload !== 'string' && ["POST", "PUT", "DELETE"].includes(req.method))
      req.body.id = payload.id

    next()
  } catch (err) {
    next(err)
  }

}

export default authMiddleware;
