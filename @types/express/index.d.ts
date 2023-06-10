declare namespace Express {
  export interface Request {
    user: {userId: string | number}
  }
  interface User {
    id: number
  }
}
