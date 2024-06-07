import { UserPayload } from '../../interface/UserPayload'; // Assurez-vous que cette importation est correcte

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}
