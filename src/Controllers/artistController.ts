import { Request, Response } from 'express';
import Artist, { IArtist } from '../Models/artistModel'; 
import cloudinary from '../utils/cloudinary';


export const createArtist = async (req: Request, res: Response) => {
  const { firstname, lastname, genre, born_date, city_of_birth, died_date } = req.body; 
  const file = req.file;

  try {
    if (!file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const result = await cloudinary.v2.uploader.upload(file.path);
    const imageUrl = result.secure_url;

    const newArtist: IArtist = new Artist({ 
      firstname,
      lastname,
      picture_url: imageUrl,
      genre,
      born_date,
      city_of_birth,
      died_date
    });
    await newArtist.save();

    res.status(201).json(newArtist);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const getArtist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id ).populate('chansons');
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    return res.status(200).json(artist);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateArtist = async (req: Request, res: Response) => {
  const { id } = req.params; 
  const { firstname, lastname, genre, born_date, city_of_birth, died_date } = req.body; 

  try {
   
    const existingArtist = await Artist.findById(id);
    if (!existingArtist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

  
    existingArtist.firstname = firstname;
    existingArtist.lastname = lastname;
    existingArtist.genre = genre;
    existingArtist.born_date = born_date;
    existingArtist.city_of_birth = city_of_birth;
    existingArtist.died_date = died_date;

    
    await existingArtist.save();

    res.status(200).json(existingArtist); 
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message }); 
  }
};

export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const artists = await Artist.find(); 
    if (!artists || artists.length === 0) {
      return res.status(404).json({ message: 'artists not found' });
    }
    return res.status(200).json(artists);
  } catch (error : any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const deleteArtist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const artist = await Artist.findById(id); 
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    await artist.deleteOne();
    return res.status(200).json({ message: 'Artist deleted successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
