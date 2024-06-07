
import { check} from 'express-validator';
import {validatorError} from "../../Middleware/validatorError"

export const validatorArtist = [
  check("firstname").notEmpty().withMessage('firstname is required'),
  check("lastname").notEmpty().withMessage('lastname is requireds'),
  check("image").notEmpty().withMessage('L\'URL de l\'image is required'),
  check("genre").notEmpty().withMessage('Le genre is required'),
  check("born_date").notEmpty().withMessage('born_date is required').isISO8601().withMessage('born_date must be a valid format yyyy-MM-dd'),
  check("city_of_birth").notEmpty().withMessage('city is required'),
  validatorError
];
