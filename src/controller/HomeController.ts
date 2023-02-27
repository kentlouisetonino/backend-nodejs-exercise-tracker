import { Request, Response } from 'express'

export async function HomeController(_: Request, res: Response) {
  res.sendFile('index.html')
}
