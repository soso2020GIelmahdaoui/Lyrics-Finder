import { Request, Response } from 'express';
import Chonson,{IChanson} from '../Models/chonsonModel'; 

export const createChonson = async (req: Request, res: Response) => {
  const { name, lyrics, artist, genre, year } = req.body;
  try {
    const newChonson:IChanson = new Chonson({
       name, 
       lyrics, 
       artist, 
       genre, 
       year });
    await newChonson.save();
    res.status(201).json(newChonson);

    
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
}};

export const getChonsonLyrics = async (req: Request, res: Response) => {
  const { id } = req.params; 
  try {
    const chonson = await Chonson.findById(id);

    if (!chonson) {
      return res.status(404).json({ message: "La chanson n'a pas été trouvée." });
    }

   
    res.status(200).json(chonson.lyrics);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la recherche des paroles." });
  }
};


export const getAllChonson = async (req: Request, res: Response) => {
  
  try {
    let obje={}
    if(req.params.id_Artist){
      obje={artist:req.params.id_Artist}
    }
    const chonsons = await Chonson.find(obje).populate({path:'artist',select:'firstname-_id'}); 
    if (!chonsons || chonsons.length === 0) {
      return res.status(404).json({ message: 'chonsons not found' });
    }
    return res.status(200).json(chonsons);
  } catch (error : any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



export const updateChonsonLyrics = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { lyrics } = req.body;
  try {
    const chonson = await Chonson.findById(id);
    if (!chonson) {
      return res.status(404).json({ message: "La chanson n'a pas été trouvée." });
    }
    chonson.lyrics = lyrics;
    await chonson.save();
    res.status(200).json(chonson);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des paroles." });
  }
};

export const deleteChonsonLyrics = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const chonson = await Chonson.findById(id);
    if (!chonson) {
      return res.status(404).json({ message: "La chanson n'a pas été trouvée." });
    }
    chonson.lyrics = ''; 
    await chonson.save();
    return res.status(404).json({ message: `Lyrics of ${chonson.name} is deleted`});
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la suppression des paroles." });
  }
};

