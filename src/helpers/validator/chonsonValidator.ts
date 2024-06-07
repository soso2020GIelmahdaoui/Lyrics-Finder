
import { check } from 'express-validator';
import { validatorError } from "../../Middleware/validatorError";
import Artist, { IArtist } from '../../Models/artistModel'; 

export const validatorChanson = [
  check("name").notEmpty().withMessage('The name of the song is required'),
  check("lyrics").optional(),
  check("artist").notEmpty().withMessage('The artist is required').custom(async (value) => {
    const existingArtist = await Artist.findById(value);
    if (!existingArtist) {
      throw new Error('The specified artist does not exist');
    }
    return true;
  }),
  check("genre").notEmpty().withMessage('The genre of the song is required'),
  check("year").notEmpty().withMessage('The year of the song is required'),
  validatorError
];
