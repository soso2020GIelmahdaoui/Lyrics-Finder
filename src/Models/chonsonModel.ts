import mongoose, { Schema, Document } from 'mongoose';

// Définition du schéma de la chanson
export interface IChanson extends Document {
  name: string;
  lyrics: string;
  artist: mongoose.Types.ObjectId; // Référence à l'artiste
  genre: string;
  year: string;
}

// Schéma de la chanson
const chansonSchema: Schema<IChanson> = new Schema({
  name: {
    type: String,
    required: true,
  },
  lyrics: {
    type: String,
    required: false,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist', // Référence à l'artiste
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});

// Modèle de la chanson
const Chanson = mongoose.model<IChanson>('Chanson', chansonSchema);

export default Chanson;
