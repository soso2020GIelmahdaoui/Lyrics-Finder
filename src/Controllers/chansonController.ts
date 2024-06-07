import { Request, Response } from 'express';
import Chanson from '../models/Chanson';

// Exemple de méthode de contrôle

// Obtenir toutes les chansons
export const getAllChansons = async (req: Request, res: Response) => {
  try {
    const chansons = await Chanson.find();
    res.status(200).json(chansons);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// Obtenir une chanson par ID
export const getChansonById = async (req: Request, res: Response) => {
  try {
    const chanson = await Chanson.findById(req.params.id);
    if (!chanson) return res.status(404).json({ message: 'Chanson not found' });
    res.status(200).json(chanson);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// Créer une nouvelle chanson
export const createChanson = async (req: Request, res: Response) => {
  try {
    const chanson = new Chanson(req.body);
    await chanson.save();
    res.status(201).json(chanson);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};

// Mettre à jour une chanson par ID
export const updateChanson = async (req: Request, res: Response) => {
  try {
    const chanson = await Chanson.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!chanson) return res.status(404).json({ message: 'Chanson not found' });
    res.status(200).json(chanson);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};

// Supprimer une chanson par ID
export const deleteChanson = async (req: Request, res: Response) => {
  try {
    const chanson = await Chanson.findByIdAndDelete(req.params.id);
    if (!chanson) return res.status(404).json({ message: 'Chanson not found' });
    res.status(200).json({ message: 'Chanson deleted' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
