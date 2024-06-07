import { Schema, model, Document } from 'mongoose';

// Définition de l'interface pour la chanson
interface IChanson extends Document {
  genre: string;
  title: string;
  recorded_date: Date;
  lyrics: string;
}

// Définition du schéma de la chanson
const ChansonSchema = new Schema<IChanson>({
  genre: { type: String, required: true },
  title: { type: String, required: true },
  recorded_date: { type: Date, required: true },
  lyrics: { type: String, required: true }
});

// Création du modèle Chanson à partir du schéma
const Chanson = model<IChanson>('Chanson', ChansonSchema);

export default Chanson;
