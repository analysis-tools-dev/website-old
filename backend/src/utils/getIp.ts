import express from "express"

export const getIp = (req: express.Request): string => {
  return (
    (req.headers["x-forwarded-for"] as string) ||
    (req.connection.remoteAddress as string)
  )
}
